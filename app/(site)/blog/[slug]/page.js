import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

import Breadcrumbs from "@/Components/Seo/Breadcrumbs";
import CtaBand from "@/Components/Seo/CtaBand";
import PostSidebar from "@/Components/PostSidebar/PostSidebar";
import JsonLd from "@/Components/Seo/JsonLd";
import { articleSchema } from "@/lib/jsonld";
import { safeFetch } from "@/sanity/lib/safe-fetch";
import { postsQuery, postBySlugQuery } from "@/sanity/lib/queries";
import { buildPageMetadata } from "@/lib/seo";
import { imageUrl } from "@/sanity/lib/image";
import styles from "./page.module.css";

export const revalidate = 60;

const postQuery = postBySlugQuery;

/**
 * Blog posts live at /blog/[slug].
 *
 * These were previously served from /posts/[slug] with no metadata of their
 * own, so every post inherited the homepage's title and canonicalised to the
 * homepage. /posts/[slug] now permanently redirects here, so old links keep
 * working and the canonical always matches the URL that is served.
 */
function extractHeadings(body) {
  if (!Array.isArray(body)) return [];
  return body
    .filter((block) => block._type === "block" && (block.style === "h2" || block.style === "h3"))
    .map((block) => ({
      _key: block._key,
      text: block.children.map((child) => child.text).join(""),
      level: parseInt(block.style.replace("h", ""), 10),
    }))
}

const portableComponents = {
  block: {
    h2: ({ value, children }) => <h2 id={value._key}>{children}</h2>,
    h3: ({ value, children }) => <h3 id={value._key}>{children}</h3>,
  },
  image: ({ value }) => (
    <Image
      src={imageUrl(value, { width: 1400 })}
      alt={value.alt || ""}
      width={value.asset?.metadata?.dimensions?.width || 1400}
      height={value.asset?.metadata?.dimensions?.height || 900}
      sizes="(max-width: 1200px) 92vw, 70vw"
    />
  ),
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await safeFetch(postQuery, { slug });

  if (!post) {
    return buildPageMetadata({
      title: "Article not found",
      path: `/blog/${slug}`,
      noindex: true,
    });
  }

  return buildPageMetadata({
    title: post.title,
    description: post.summary,
    path: `/blog/${slug}`,
    image: post.image ? imageUrl(post.image, { width: 1200, height: 630 }) : undefined,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post._updatedAt,
  });
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    safeFetch(postQuery, { slug }),
    safeFetch(postsQuery),
  ]);

  if (!post) notFound();

  const headings = extractHeadings(post.body);
  const dateLabel = post.publishedAt || post._createdAt;

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: post.title,
          description: post.summary,
          path: `/blog/${slug}`,
          datePublished: post.publishedAt,
          dateModified: post._updatedAt,
          image: post.image ? imageUrl(post.image, { width: 1200, height: 630 }) : null,
        })}
      />

      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ]}
      />

      <div className={styles.page}>
        <PostSidebar headings={headings} allPosts={allPosts} />
        <article className={styles.main}>
          <header className={styles.header}>
            {dateLabel ? (
              <p className={styles.meta}>
                Published{" "}
                <time dateTime={new Date(dateLabel).toISOString()}>
                  {new Date(dateLabel).toDateString()}
                </time>
              </p>
            ) : null}
            <h1>{post.title || "Untitled"}</h1>
            {post.summary ? <p className={styles.summary}>{post.summary}</p> : null}
          </header>

          {post.image ? (
            <Image
              className={styles.cover}
              src={imageUrl(post.image, { width: 1400 })}
              alt={post.imageAlt || post.title || ""}
              width={post.image.metadata?.width || 1400}
              height={post.image.metadata?.height || 900}
              sizes="(max-width: 1200px) 92vw, 70vw"
              priority
            />
          ) : null}

          {Array.isArray(post.body) && post.body.length > 0 ? (
            <div className={styles.body}>
              <PortableText value={post.body} components={portableComponents} />
            </div>
          ) : null}
        </article>
      </div>

      <CtaBand />
    </>
  );
}