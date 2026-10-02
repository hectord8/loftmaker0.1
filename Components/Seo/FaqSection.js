import JsonLd from "@/Components/Seo/JsonLd";
import { faqSchema } from "@/lib/jsonld";
import styles from "./inner.module.css";

/**
 * Frequently asked questions.
 *
 * The questions and answers are always visible (no accordion), so the FAQPage
 * structured data matches content the visitor and Googlebot can both see.
 * Emit this component only where the same copy is rendered.
 */
export default function FaqSection({ faqs = [], heading = "Frequently asked questions" }) {
  if (!faqs.length) return null;

  return (
    <section aria-labelledby="faq-heading">
      <div className={styles.prose}>
        <h2 id="faq-heading">{heading}</h2>
      </div>
      <div className={styles.faq}>
        {faqs.map((faq) => (
          <div className={styles.faqItem} key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
      <JsonLd data={faqSchema(faqs)} />
    </section>
  );
}
