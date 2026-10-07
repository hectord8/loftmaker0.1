"use client";

import Link from "next/link";
import styles from "./latestposts.module.css";
import useInView from "@/Components/useInView";
import { urlFor } from "@/sanity/lib/image";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function TimelineClient({ posts }) {
  const { ref, isVisible } = useInView();

  return (
    <section
      ref={ref}
      className={`${styles.timeline} ${isVisible ? styles.isVisible : ""}`}
      aria-labelledby="updates-heading"
    >
      <div className={styles.header}>
        <h2 id="updates-heading">Latest Updates</h2>
        <p className={styles.subtitle}>
          What we&apos;ve been working on this week.
        </p>
      </div>
      <div className={styles.entries}>
        {posts.map((post) => (
          <article key={post._id} className={styles.entry}>
            <div className={styles.content}>
              {post.image ? (
                <img
                  className={styles.image}
                  src={urlFor(post.image).width(1200).fit("max").url()}
                  alt={post.title || "Update image"}
                  loading="lazy"
                />
              ) : null}
              <div className={styles.body}>
                <time className={styles.date}>
                  {post._createdAt ? formatDate(post._createdAt) : null}
                </time>
                <h3 className={styles.title}>
                  {post.title || "Untitled update"}
                </h3>
                {post.summary ? (
                  <p className={styles.summary}>{post.summary}</p>
                ) : null}
                {post.slug ? (
                  <Link
                    href={`/posts/${post.slug.replace(/^\/+/, "")}`}
                    className={styles.link}
                  >
                    Read this update &rarr;
                  </Link>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
