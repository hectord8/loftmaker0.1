"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./postsidebar.module.css";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function groupPostsByDate(posts) {
  if (!posts || !posts.length) return [];

  const map = {};

  for (const post of posts) {
    const raw = post.publishedAt || post._createdAt;
    if (!raw) continue;
    const date = new Date(raw);
    const label = date.toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });

    if (!map[label]) {
      map[label] = { label, date, posts: [] };
    }
    map[label].posts.push(post);
  }

  return Object.values(map).sort((a, b) => b.date - a.date);
}

export default function PostSidebar({ headings, allPosts }) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!headings || !headings.length) return;

    const ids = headings.map((h) => h._key).filter(Boolean);
    if (!ids.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: 0 }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  const grouped = groupPostsByDate(allPosts);

  return (
    <aside className={styles.sidebar}>
      {headings && headings.length > 0 ? (
        <nav className={styles.section}>
          <h4 className={styles.sectionTitle}>On this page</h4>
          <ul className={styles.toc}>
            {headings.map((h) => (
              <li
                key={h._key}
                className={`${styles.tocItem} ${styles[`l${h.level}`]} ${
                  activeId === h._key ? styles.isActive : ""
                }`}
              >
                <a
                  href={`#${h._key}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(h._key);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      {grouped.length > 0 ? (
        <nav className={styles.section}>
          <h4 className={styles.sectionTitle}>All updates</h4>
          {grouped.map((group) => (
            <div key={group.label} className={styles.monthGroup}>
              <ul className={styles.archiveList}>
                {group.posts.map((p) => {
                  const raw = p.publishedAt || p._createdAt;
                  return (
                    <li key={p._id || p.slug}>
                      <Link
                        href={`/posts/${p.slug.replace(/^\/+/, "")}`}
                        className={styles.archiveLink}
                      >
                        <span className={styles.archiveDate}>
                          {raw ? formatDate(raw) : null}
                        </span>
                        <span className={styles.archiveTitle}>
                          {p.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      ) : null}
    </aside>
  );
}
