import styles from "./page.module.css";
import { sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const galleryQuery = `*[_type == "gallery"]{
  title,
  images[]{
    "image": image,
    caption,
    _key
  }
} | order(title asc)`;

export const revalidate = 60;

export default async function GalleryPage() {
  const galleries = await sanityClient.fetch(galleryQuery);

  if (!galleries || galleries.length === 0) {
    return (
      <div className={styles.page}>
        <p className={styles.empty}>No galleries yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {galleries.map((gallery) => (
        <section key={gallery.title} className={styles.section}>
          <h2 className={styles.title}>{gallery.title}</h2>
          {gallery.images && gallery.images.length > 0 ? (
            <div className={styles.grid}>
              {gallery.images.map((img) => (
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
          ) : null}
        </section>
      ))}
    </div>
  );
}
