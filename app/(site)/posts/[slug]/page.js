import { PortableText } from "@portabletext/react";

import { sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import styles from "./page.module.css";

const postQuery = `*[_type in ["post", "posts", "content"] && (slug.current == $slug || slug == $slug)][0]{
  ...,
  "slug": coalesce(slug.current, slug),
  "summary": coalesce(summary, excerpt, description),
  "image": coalesce(coverImage, mainImage, image)
}`;

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

  const post = await sanityClient.fetch(postQuery, { slug });

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

  return (
    <article className={styles.wrapper}>
      <header className={styles.header}>
        {post._createdAt ? (
          <p className={styles.meta}>
            Published {new Date(post._createdAt).toDateString()}
          </p>
        ) : null}
        <h1>{post.title || "Untitled"}</h1>
        {post.summary ? <p className={styles.summary}>{post.summary}</p> : null}
      </header>
      {imageUrl ? (
        <img className={styles.cover} src={imageUrl} alt={post.title || "Post"} />
      ) : null}
      {Array.isArray(post.body) && post.body.length > 0 ? (
        <div className={styles.body}>
          <PortableText value={post.body} />
        </div>
      ) : null}
      
    </article>
  );
}
