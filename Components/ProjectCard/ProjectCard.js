import Image from "next/image";
import Link from "next/link";

import { imageUrl, imageDimensions } from "@/sanity/lib/image";
import styles from "./projects.module.css";

/**
 * Project card.
 *
 * Uses next/image with explicit dimensions from the Sanity asset metadata, so
 * the browser gets a right-sized AVIF/WebP source and the card reserves its
 * space before the image arrives - which is what keeps cumulative layout shift
 * at zero.
 *
 * `alt` is only as descriptive as the CMS. Alt text is a required field on the
 * gallery and project schemas, so an unlabelled photo cannot be published.
 */
export default function ProjectCard({ project, priority = false }) {
  if (!project) return null;

  const cover = project.coverImage;
  const { width, height } = imageDimensions(cover);
  const href = `/projects/${project.slug}`;

  return (
    <article className={styles.card}>
      <Link href={href} className={styles.link}>
        {cover?.url ? (
          <Image
            src={imageUrl(cover, { width: 800, height: 600 })}
            alt={cover.altText || ""}
            width={width}
            height={height}
            sizes="(max-width: 700px) 92vw, (max-width: 1200px) 45vw, 30vw"
            className={styles.image}
            {...(priority ? { priority: true } : { loading: "lazy" })}
          />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true" />
        )}
        <div className={styles.body}>
          <h2 className={styles.title}>{project.title}</h2>
          <p className={styles.meta}>
            {[project.buildType, project.location].filter(Boolean).join(" · ")}
          </p>
          {project.summary ? <p className={styles.summary}>{project.summary}</p> : null}
        </div>
      </Link>
    </article>
  );
}