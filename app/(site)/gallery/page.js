import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";
import Breadcrumbs from "@/Components/Seo/Breadcrumbs";
import CtaBand from "@/Components/Seo/CtaBand";
import PageHeader from "@/Components/Seo/PageHeader";
import { imageUrl } from "@/sanity/lib/image";
import { safeFetch } from "@/sanity/lib/safe-fetch";
import { galleryQuery } from "@/sanity/lib/queries";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 60;

/*
  Images preloaded instead of lazy-loaded; the other 49 load as the user
  scrolls.

  Deliberately 1. Chrome was picking a lazy gallery photo as the LCP element,
  which pushed LCP to 6.4s. Preloading a whole row is worse than that - it
  saturates bandwidth on a 50-image page before the main thread has finished.
*/
const EAGER_IMAGE_COUNT = 1;

/**
 * This page previously inherited its metadata from app/(site)/layout.js, so it
 * was served with the homepage's title, description and canonical: "/". It now
 * has its own, and canonicalises to itself.
 */
export const metadata = buildPageMetadata({
  title: "Gallery",
  description:
    "Photographs of completed loft conversions, dormers, mansard roofs, side extensions and flat roofing by Loft Maker London across London and Essex.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const galleries = (await safeFetch(galleryQuery)) || [];

  /*
    Keys of the images allowed to preload rather than lazy-load. Computed with
    a flat slice rather than a decrementing counter: the React Compiler lint
    rule (react-hooks/immutability) rejects mutating a binding during render.
  */
  const eagerImageKeys = new Set(
    galleries
      .flatMap((gallery) => gallery.images || [])
      .slice(0, EAGER_IMAGE_COUNT)
      .map((item) => item._key)
  );

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ]}
      />

      <PageHeader
        eyebrow="Our work"
        h1="Gallery"
        lede="Completed work, photographed on site. Each group is a single property."
      />

      {galleries.length === 0 ? (
        <div className={styles.page}>
          <p className={styles.empty}>There is no gallery content to show yet.</p>
        </div>
      ) : (
        <div className={styles.page}>
          {galleries.map((gallery) => (
            <section
              key={gallery.title}
              className={styles.section}
              aria-labelledby={slugify(gallery.title)}
            >
              <h2 className={styles.title} id={slugify(gallery.title)}>
                {gallery.title}
              </h2>
              {gallery.location ? (
                <p className={styles.galleryMeta}>
                  {gallery.location}
                  {gallery.projectSlug ? (
                    <>
                      {" · "}
                      <Link href={`/projects/${gallery.projectSlug.value || gallery.projectSlug}`}>
                        Read the case study
                      </Link>
                    </>
                  ) : null}
                </p>
              ) : null}

              {gallery.images?.length > 0 ? (
                <div className={styles.grid}>
                  {gallery.images.map((item) => {
                    /*
                      The URL is cropped to a 4:3 landscape box, so the width and
                      height attributes have to describe that crop. They used to
                      report the source dimensions (often 1536x2048 portrait),
                      which described an aspect ratio the delivered bytes do not
                      have.
                    */
                    const width = 800;
                    const height = 600;

                    /* Preloaded if it is one of the first few on the page, lazy
                       otherwise - see EAGER_IMAGE_COUNT. */
                    const eager = eagerImageKeys.has(item._key);

                    return (
                      <figure key={item._key} className={styles.card}>
                        <Image
                          className={styles.image}
                          src={imageUrl(item, { width, height })}
                          /*
                            Alt text is a required field on the gallery schema, so a
                            photo cannot be published unlabelled. The fallback is
                            built from the location and build type that travel with
                            the image, and is still descriptive rather than
                            "Gallery image" - the old value, which told a screen
                            reader nothing.
                          */
                          alt={
                            item.altText ||
                            [item.location, item.buildType, item.caption]
                              .filter(Boolean)
                              .join(" - ") ||
                            `Photograph of completed work from ${gallery.title}`
                          }
                          width={width}
                          height={height}
                          sizes="(max-width: 700px) 92vw, (max-width: 1200px) 45vw, 30vw"
                          {...(eager ? { priority: true } : { loading: "lazy" })}
                        />
                        {item.caption || item.buildType ? (
                          <figcaption className={styles.caption}>
                            {item.caption || item.buildType}
                          </figcaption>
                        ) : null}
                      </figure>
                    );
                  })}
                </div>
              ) : null}
            </section>
          ))}
        </div>
      )}

      <CtaBand />
    </>
  );
}

/** Used as a heading id; also makes the trailing spaces in the legacy titles moot. */
function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}