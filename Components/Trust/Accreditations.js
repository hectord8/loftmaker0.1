import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import styles from "./trust.module.css";

/**
 * Accreditation and trade-body badges from Sanity.
 * Renders nothing while the dataset is empty - no placeholder trade bodies.
 */
export default function Accreditations({
  accreditations = [],
  heading = "Accreditations and memberships",
  id = "accreditations",
}) {
  if (!accreditations?.length) return null;

  return (
    <section className={styles.section} id={id} aria-labelledby={`${id}-heading`}>
      <h2 className={styles.heading} id={`${id}-heading`}>
        {heading}
      </h2>
      <ul className={styles.grid}>
        {accreditations.map((item) => {
          const name = (
            <span className={styles.badgeText}>
              <span className={styles.badgeName}>{item.name}</span>
              {item.issuer ? <span className={styles.badgeIssuer}>{item.issuer}</span> : null}
            </span>
          );

          return (
            <li className={styles.badge} key={item._id}>
              {item.logo ? (
                <Image
                  src={urlFor(item.logo).width(160).height(160).fit("max").url()}
                  alt={item.altText || `${item.name} logo`}
                  width={56}
                  height={56}
                  sizes="56px"
                />
              ) : null}
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noopener">
                  {name}
                </a>
              ) : (
                name
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
