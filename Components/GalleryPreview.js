import styles from "@/app/(site)/page.module.css";
import Image from "next/image";
import Link from "next/link";

import { imageUrl, imageDimensions } from "@/sanity/lib/image";
import { safeFetch } from "@/sanity/lib/safe-fetch";
import { featuredImagesQuery } from "@/sanity/lib/queries";

/**
 * Homepage gallery preview.
 *
 * Three fixes:
 *   - it fetched `*[_type == "gallery"][0]`, so the homepage showed images from
 *     whichever document happened to be first rather than the featured set;
 *   - it used a raw <img>, which skipped the optimiser entirely - the single
 *     biggest avoidable cost on the page;
 *   - "See More" was a link with no context for a screen reader, which is why
 *     Lighthouse flagged it. It now names its destination.
 */
export default async function GalleryPreview() {
  const galleries = (await safeFetch(featuredImagesQuery)) || [];

  const images = galleries
    .flatMap((gallery) =>
      (gallery.images || []).map((image) => ({ ...image, galleryTitle: gallery.title })),
    )
    .slice(0, 6);

  if (!images.length) return null;

  return (
    <section className={styles.galleryPreview} aria-labelledby="gallery-preview-heading">
      <h2 id="gallery-preview-heading">Recent projects</h2>
      <div className={styles.galleryGrid}>
        {images.map((item) => {
          const { width, height } = imageDimensions(item);

          return (
            <Link key={item._key} href="/gallery" className={styles.galleryCard}>
              <Image
                className={styles.galleryImage}
                src={imageUrl(item, { width: 600, height: 400 })}
                /*
                  Alt text is required on the gallery schema. Until the owner fills
                  it in, the fallback describes the photograph's subject rather than
                  repeating "Gallery image", which told a screen-reader user
                  nothing at all.
                */
                alt={
                  item.altText ||
                  [item.location, item.galleryTitle, item.buildType, item.caption]
                    .filter(Boolean)
                    .join(" - ") ||
                  "Photograph of completed Loft Maker London work"
                }
                width={width}
                height={height}
                sizes="(max-width: 700px) 92vw, (max-width: 1200px) 45vw, 30vw"
                loading="lazy"
              />
              {item.caption || item.location ? (
                <span className={styles.galleryCaption}>
                  {item.caption || item.location}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
      <Link
        href="/gallery"
        className={`${styles.seeMore} siteButton siteButtonSecondaryDark`}
      >
        See more completed projects
      </Link>
    </section>
  );
}