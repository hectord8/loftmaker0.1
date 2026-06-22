import styles from "./page.module.css";
import { sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const galleryQuery = `*[_type == "gallery"][0]{
  title,
  images[]{
    "image": image,
    caption,
    _key
  }
}`;

export const revalidate = 60;

export default async function GalleryPage() {
  const data = await sanityClient.fetch(galleryQuery);
  const images = data?.images;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{data?.title || "Gallery"}</h1>
      {images && images.length > 0 ? (
        <div className={styles.grid}>
          {images.map((img) => (
            <div key={img._key} className={styles.card}>
              <img
                className={styles.image}
                src={urlFor(img.image).width(800).height(600).fit("crop").url()}
                alt={img.caption || "Gallery image"}
                loading="lazy"
              />
              {img.caption ? (
                <p className={styles.caption}>{img.caption}</p>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>No images yet.</p>
      )}
    </div>
  );
}
