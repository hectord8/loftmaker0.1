import JsonLd from "@/Components/Seo/JsonLd";
import styles from "./trust.module.css";

/**
 * Customer reviews, read from Sanity.
 *
 * Renders nothing at all while the dataset is empty, so the site never shows
 * invented testimonials. Review JSON-LD is emitted only for reviews that
 * actually exist in the CMS.
 */
export default function Reviews({
  reviews = [],
  heading = "What our customers say",
  id = "reviews",
}) {
  if (!reviews?.length) return null;

  const schema = {
    "@type": "ItemList",
    name: heading,
    itemListElement: reviews.map((review, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Review",
        author: { "@type": "Person", name: review.name },
        ...(review.projectType ? { itemReviewed: { "@type": "Service", name: review.projectType } } : {}),
        reviewBody: review.text,
        ...(review.date ? { datePublished: review.date } : {}),
      },
    })),
  };

  return (
    <section className={styles.section} id={id} aria-labelledby={`${id}-heading`}>
      <h2 className={styles.heading} id={`${id}-heading`}>
        {heading}
      </h2>
      <ul className={styles.grid}>
        {reviews.map((review) => (
          <li className={styles.card} key={review._id}>
            <h3 className={styles.stars} aria-label={starsLabel(review.rating)}>
              <span aria-hidden="true">{"★".repeat(Math.max(0, Math.min(5, review.rating || 0)))}</span>
            </h3>
            <p className={styles.quote}>&ldquo;{review.text}&rdquo;</p>
            <p className={styles.meta}>
              {review.name}
              {review.area ? `, ${review.area}` : ""}
            </p>
            {review.projectType ? <p className={styles.meta}>{review.projectType}</p> : null}
          </li>
        ))}
      </ul>
      <JsonLd data={schema} />
    </section>
  );
}

function starsLabel(rating) {
  if (!rating) return "Customer review";
  return `Rated ${rating} out of 5`;
}
