import styles from "@/app/(site)/page.module.css";
import { sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const featuredQuery = `*[_type == "gallery"][0]{
  "featuredImages": images[featured == true][0...6]
}`;

export default async function GalleryPreview() {
  const data = await sanityClient.fetch(featuredQuery);
  const images = data?.featuredImages;

  if (!images || images.length === 0) return null;

  return (
    <section className={styles.galleryPreview}>
      <h2>Projects</h2>
      <div className={styles.galleryGrid}>
        {images.map((img) => (
          <Link key={img._key} href="/gallery" className={styles.galleryCard}>
            <img
              className={styles.galleryImage}
              src={urlFor(img.image).width(600).height(400).fit("crop").url()}
              alt={img.caption || "Gallery image"}
              loading="lazy"
            />
            {img.caption ? (
              <span className={styles.galleryCaption}>{img.caption}</span>
            ) : null}
          </Link>
        ))}
      </div>
      <Link href="/gallery" className={`${styles.seeMore} siteButton siteButtonSecondaryDark`}>See More</Link>
    </section>
  );
}
