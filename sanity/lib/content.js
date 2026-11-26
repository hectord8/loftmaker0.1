import { cache } from "react";

import { sanityClient } from "./client";
import { urlFor } from "./image";
import {
  defaultHomePage,
  defaultLoftHub,
  defaultLoftPages,
  defaultSiteSettings,
} from "@/data/content";

const REVALIDATE = 60;

const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  value === "" ||
  (Array.isArray(value) && value.length === 0);

// Sanity values win; anything left blank in the Studio falls back to the default.
function withDefaults(defaults, data) {
  const merged = { ...defaults };
  for (const [key, value] of Object.entries(data || {})) {
    if (isEmpty(value)) continue;
    const fallback = defaults[key];
    merged[key] =
      value && typeof value === "object" && !Array.isArray(value) &&
      fallback && typeof fallback === "object" && !Array.isArray(fallback) &&
      !value._type
        ? withDefaults(fallback, value)
        : value;
  }
  return merged;
}

async function safeFetch(query, params = {}) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
  try {
    return await sanityClient.fetch(query, params, { next: { revalidate: REVALIDATE } });
  } catch (error) {
    console.error("Sanity fetch failed:", error?.message || error);
    return null;
  }
}

export const imageUrl = (image, width, height) => {
  if (!image) return null;
  if (image.url && !image.asset) return image.url; // static fallback image
  const builder = urlFor(image).width(width).auto("format");
  return height ? builder.height(height).fit("crop").url() : builder.url();
};

export const toE164 = (phone = "") => {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  return digits.startsWith("0") ? `+44${digits.slice(1)}` : digits;
};

export const getSiteSettings = cache(async () => {
  const data = await safeFetch(`*[_id == "siteSettings"][0]`);
  const settings = withDefaults(defaultSiteSettings, data);
  return { ...settings, phoneE164: toE164(settings.phone) };
});

export const getHomePage = cache(async () => {
  const data = await safeFetch(`*[_id == "homePage"][0]`);
  return withDefaults(defaultHomePage, data);
});

export const getFeaturedProjects = cache(async () => {
  const data = await safeFetch(
    `*[_type == "project" && featured == true] | order(_createdAt desc)[0...6]{_id, title, summary}`
  );
  return data || [];
});

export const getLoftHub = cache(async () => {
  const data = await safeFetch(`*[_id == "loftHub"][0]`);
  return withDefaults(defaultLoftHub, data);
});

const loftPageFields = `
  _id, title, "slug": slug.current, pageType, order, eyebrow, heading, summary,
  heroImage, highlights, body, sections, faqs, cta, seo,
  "projects": projects[]->{_id, title, summary, loftType, area, duration, coverImage, testimonial, clientName}
`;

export const getLoftPages = cache(async () => {
  const data = await safeFetch(
    `*[_type == "loftPage" && defined(slug.current)] | order(order asc, title asc){${loftPageFields}}`
  );
  if (!data || data.length === 0) return defaultLoftPages;
  // Pages that match a built-in default (dormer, mansard…) fall back to its
  // wording for any field left blank; new pages added in Studio stand alone.
  return data.map((page) => {
    const fallback = defaultLoftPages.find((d) => d.slug === page.slug);
    return fallback ? withDefaults(fallback, page) : page;
  });
});

export const getLoftPage = cache(async (slug) => {
  const pages = await getLoftPages();
  return pages.find((page) => page.slug === slug) || null;
});
