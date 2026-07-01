import { PortableText } from "@portabletext/react";

import { sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import PostSidebar from "@/Components/PostSidebar/PostSidebar";
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
  const resolvedParams = await Promise.resolve(params);
  const rawSlug = resolvedParams?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  if (!slug) {
    return (
      <div className={styles.wrapper}>
        <h1>Post not found</h1>
        <p>This post is missing a slug.</p>
      </div>
    );
  }

  const [post, allPosts] = await Promise.all([
    sanityClient.fetch(postQuery, { slug }),
    sanityClient.fetch(archiveQuery),
  ]);

  if (!post) {
    return (
      <div className={styles.wrapper}>
        <h1>Post not found</h1>
        <p>We could not find this post.</p>
      </div>
    );
  }

  const imageUrl = post.image
    ? urlFor(post.image).width(1400).height(900).fit("crop").url()
    : null;

  const headings = extractHeadings(post.body);
  const dateLabel = post.publishedAt || post._createdAt;

  return (
    <div className={styles.page}>
      <PostSidebar headings={headings} allPosts={allPosts} />
      <article className={styles.main}>
        <header className={styles.header}>
          {dateLabel ? (
            <p className={styles.meta}>
              Published {new Date(dateLabel).toDateString()}
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
