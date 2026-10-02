import { site } from "@/data/site";
import styles from "./trust.module.css";

/**
 * Insurance and warranty detail.
 *
 * The 10-year structural warranty is already claimed elsewhere on the site, so
 * the years render. The provider, the insurance level and the policy wording
 * are only rendered when the owner has supplied them - nothing is invented and
 * no placeholder is shown to visitors.
 */
export default function TrustDetails({ company = null, heading = "Insurance and warranty", id = "trust" }) {
  const warrantyYears = company?.warrantyYears || site.warrantyYears;
  const warrantyProvider = company?.warrantyProvider || site.warrantyProvider;
  const insuranceProvider = company?.insuranceProvider || site.insurance?.provider;
  const insuranceLevel = company?.insuranceLevel || site.insurance?.level;

  const items = [];

  if (warrantyYears) {
    items.push({
      title: `${warrantyYears}-year structural warranty`,
      body: warrantyProvider
        ? `Provided by ${warrantyProvider}. The full policy wording and schedule of cover are issued at handover.`
        : "Every completed project is covered by a structural warranty. The full policy wording and schedule of cover are issued at handover.",
    });
  }

  if (insuranceProvider || insuranceLevel) {
    items.push({
      title: "Insurance",
      body: [insuranceLevel, insuranceProvider].filter(Boolean).join(" - ") + ".",
    });
  }

  if (!items.length) return null;

  return (
    <section className={styles.section} id={id} aria-labelledby={`${id}-heading`}>
      <h2 className={styles.heading} id={`${id}-heading`}>
        {heading}
      </h2>
      <ul className={styles.detailList}>
        {items.map((item) => (
          <li className={styles.detail} key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
