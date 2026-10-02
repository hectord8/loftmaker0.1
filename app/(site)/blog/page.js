import Link from "next/link";

import Breadcrumbs from "@/Components/Seo/Breadcrumbs";
import CtaBand from "@/Components/Seo/CtaBand";
import PageHeader from "@/Components/Seo/PageHeader";
import { safeFetch } from "@/sanity/lib/safe-fetch";
import { postsQuery } from "@/sanity/lib/queries";
import { buildPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = buildPageMetadata({
  title: "Blog",
  description:
    "Practical guidance on loft conversions, extensions, planning, building regulations and structural work from the Loft Maker London team.",
  path: "/blog",
});

export const revalidate = 60;

/**
 * Blog index.
 *
 * The posts previously had no index at all - they were reachable only by direct
 * URL at /posts/[slug], which meant there was no crawlable route into the blog
 * and no way for a visitor to find them. They now live at /blog/[slug] and this
 * page links them all.
 */
export default async function BlogIndex() {
  const posts = (await safeFetch(postsQuery)) || [];

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      <PageHeader
        eyebrow="Insights"
        h1="Blog"
        lede="Practical guidance on loft conversions, extensions, planning, building regulations and structural work, written by the people doing the job."
      />

      {posts.length === 0 ? (
        <div className={styles.prose}>
          <p>
            We are writing our first articles now. If you have a question in the
            meantime, send it to us and we will answer it directly &mdash;{" "}
            <a href="mailto:loftmaker@live.co.uk">loftmaker@live.co.uk</a>.
          </p>
        </div>
      ) : (
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post._id} className={styles.item}>
              <h2>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              {post.publishedAt ? (
                <p className={styles.meta}>
                  <time dateTime={new Date(post.publishedAt).toISOString()}>
                    {new Date(post.publishedAt).toDateString()}
                  </time>
                </p>
              ) : null}
              {post.summary ? <p className={styles.summary}>{post.summary}</p> : null}
            </li>
          ))}
        </ul>
      )}

      <CtaBand />
    </>
  );
}