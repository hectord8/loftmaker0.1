import { cache } from "react";
import { notFound } from "next/navigation";
import { PortableText, toPlainText } from "@portabletext/react";

import { sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import PostSidebar from "@/Components/PostSidebar/PostSidebar";
import { site } from "@/data/site";
import styles from "./page.module.css";

const postQuery = `*[_type in ["post", "posts", "content"] && (slug.current == $slug || slug == $slug)][0]{
  ...,
  "slug": coalesce(slug.current, slug),
  "summary": coalesce(summary, excerpt, description),
  "image": coalesce(coverImage, mainImage, image)
}`;

const archiveQuery = `*[_type in ["post", "posts", "content"]] | order(publishedAt desc, _createdAt desc)[0...50]{
  _id,
  title,
  _createdAt,
  publishedAt,
  "slug": coalesce(slug.current, slug)
}`;

export const revalidate = 60;

async function resolveSlug(params) {
  const resolvedParams = await Promise.resolve(params);
  const rawSlug = resolvedParams?.slug;
  return Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
}

// Shared by generateMetadata and the page so Sanity is queried once per request.
const getPost = cache((slug) => sanityClient.fetch(postQuery, { slug }));

function describePost(post) {
  if (post.summary) return post.summary;
  const text = Array.isArray(post.body) ? toPlainText(post.body).trim() : "";
  if (!text) return site.description;
  return text.length > 155 ? `${text.slice(0, 152).trimEnd()}...` : text;
}

export async function generateMetadata({ params }) {
  const slug = await resolveSlug(params);
  const post = slug ? await getPost(slug) : null;
  if (!post) return { title: "Post not found", robots: { index: false } };

  const title = post.seo?.title || post.title || "Untitled";
  const description = post.seo?.description || describePost(post);
  const path = `/posts/${post.slug}`;
  const image = post.seo?.image
    ? urlFor(post.seo.image).width(1200).height(630).fit("crop").url()
    : post.image
    ? urlFor(post.image).width(1200).height(630).fit("crop").url()
    : site.image;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title,
      description,
      url: path,
      publishedTime: post.publishedAt || post._createdAt,
      modifiedTime: post._updatedAt,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

function extractHeadings(body) {
  if (!Array.isArray(body)) return [];
  return body
    .filter(
      (b) =>
        b._type === "block" &&
        (b.style === "h2" || b.style === "h3") &&
        b.children?.length
    )
    .map((b) => ({
      _key: b._key,
      text: b.children.map((c) => c.text).join(""),
      level: parseInt(b.style.replace("h", ""), 10),
    }));
}

const portableComponents = {
  block: {
    h2: ({ value, children }) => <h2 id={value._key}>{children}</h2>,
    h3: ({ value, children }) => <h3 id={value._key}>{children}</h3>,
  },
};

export default async function PostPage({ params }) {
  const slug = await resolveSlug(params);
  if (!slug) notFound();

  const [post, allPosts] = await Promise.all([
    getPost(slug),
    sanityClient.fetch(archiveQuery),
  ]);

  // A real 404 instead of a 200 "not found" page, so search engines drop dead URLs.
  if (!post) notFound();

  const imageUrl = post.image
    ? urlFor(post.image).width(1400).height(900).fit("crop").url()
    : null;

  const headings = extractHeadings(post.body);
  const dateLabel = post.publishedAt || post._createdAt;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title || "Untitled",
    description: describePost(post),
    datePublished: dateLabel,
    dateModified: post._updatedAt || dateLabel,
    mainEntityOfPage: `${site.url}/posts/${post.slug}`,
    image: imageUrl || `${site.url}${site.image}`,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": `${site.url}/#business` },
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PostSidebar headings={headings} allPosts={allPosts} />
      <article className={styles.main}>
        <header className={styles.header}>
          {dateLabel ? (
            <p className={styles.meta}>
              Published{" "}
              <time dateTime={dateLabel}>{new Date(dateLabel).toDateString()}</time>
            </p>
          ) : null}
          <h1>{post.title || "Untitled"}</h1>
          {post.summary ? <p className={styles.summary}>{post.summary}</p> : null}
        </header>
        {imageUrl ? (
          <img
            className={styles.cover}
            src={imageUrl}
            alt={post.title || "Post"}
          />
        ) : null}
        {Array.isArray(post.body) && post.body.length > 0 ? (
          <div className={styles.body}>
            <PortableText value={post.body} components={portableComponents} />
          </div>
        ) : null}
      </article>
    </div>
  );
}
