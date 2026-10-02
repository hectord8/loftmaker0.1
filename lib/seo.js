import { site } from "@/data/site";

export const SITE_URL = site.url;

/** Google shows roughly 60 characters of title and 160 of description. */
export const TITLE_LIMIT = 60;
export const DESCRIPTION_LIMIT = 160;

/**
 * Build an absolute URL from a site-relative path.
 * Guards against the double slash you get by joining a trailing-slash origin
 * with a leading-slash path.
 */
export function absoluteUrl(path = "/") {
  if (!path) return `${SITE_URL}/`;
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Resolve the <title> Next would generate, so OG and Twitter match it. */
export function resolveTitle(title) {
  if (!title) return site.name;
  if (title.includes("|")) return title;
  return `${title} | ${site.name}`;
}

function warn(label, value, limit) {
  if (value && value.length > limit && process.env.NODE_ENV !== "production") {
    console.warn(`[seo] ${label} is ${value.length} characters (over ${limit}): "${value}"`);
  }
}

/**
 * Trim a description to a length Google will actually display, on a word
 * boundary. Applied to every page, because a meta description from the CMS can
 * be any length and an over-long one is silently truncated anyway.
 */
export function truncateDescription(text, limit = DESCRIPTION_LIMIT) {
  if (!text) return text;
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;

  const clipped = clean.slice(0, limit);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${(lastSpace > limit * 0.6 ? clipped.slice(0, lastSpace) : clipped).trimEnd()}…`;
}

/**
 * One helper for every page's metadata, so title, description, canonical,
 * Open Graph and Twitter can never drift apart.
 *
 * `title` is the short form, e.g. "Loft Conversions in London and Essex". The
 * full title is resolved once here and emitted as `absolute`, which stops
 * Next appending the root layout's "%s | Loft Maker London" template on top of
 * a title that already contains the brand name - which is what made <title>
 * and og:title disagree on pages like the homepage.
 */
export function buildPageMetadata({
  title,
  description,
  path = "/",
  image,
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex = false,
} = {}) {
  const fullTitle = resolveTitle(title);
  const ogImage = absoluteUrl(image || site.defaultOgImage);
  const metaDescription = truncateDescription(description);

  warn("title", fullTitle, TITLE_LIMIT);
  warn("description", metaDescription, DESCRIPTION_LIMIT);

  return {
    ...(fullTitle ? { title: { absolute: fullTitle } } : {}),
    ...(metaDescription ? { description: metaDescription } : {}),
    alternates: { canonical: path },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      ...(metaDescription ? { description: metaDescription } : {}),
      url: absoluteUrl(path),
      siteName: site.name,
      locale: "en_GB",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt || site.defaultOgImageAlt,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      ...(metaDescription ? { description: metaDescription } : {}),
      images: [ogImage],
    },
  };
}
