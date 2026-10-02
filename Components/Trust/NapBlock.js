import { site } from "@/data/site";
import styles from "./trust.module.css";

/**
 * Contact details block (NAP) for the footer and the contact page.
 *
 * Until the owner supplies a postal address this states the areas served,
 * which is the accurate description of the business. Nothing is invented, and
 * the phone number is shown in the same format everywhere on the site.
 */
export default function NapBlock({ heading = "Contact details", headingLevel: Heading = "h2", id = "nap" }) {
  return (
    <section aria-labelledby={`${id}-heading`} id={id}>
      <Heading className={styles.heading} id={`${id}-heading`}>
        {heading}
      </Heading>
      <ul className={styles.detailList}>
        <li className={styles.detail}>
          <h3>Telephone</h3>
          <p>
            <a href={site.telHref} data-call-placement="nap">
              {site.phoneDisplay}
            </a>
          </p>
        </li>
        <li className={styles.detail}>
          <h3>Email</h3>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </li>
        <li className={styles.detail}>
          <h3>Address</h3>
          {site.address ? (
            <p>
              <address>
                {site.address.streetAddress}
                {site.address.addressLocality ? <br /> : null}
                {site.address.addressLocality}
                {site.address.postalCode ? <br /> : null}
                {site.address.postalCode}
              </address>
            </p>
          ) : (
            <p>
              We are a mobile, service-area business covering {site.areaServed
                .map((area) => area.name)
                .join(", ")}. We come to you, so there is no office to visit - get in
              touch and we will arrange a visit.
            </p>
          )}
        </li>
        <li className={styles.detail}>
          <h3>Opening hours</h3>
          <p>
            Monday to Friday 08:00 - 18:00
            <br />
            Saturday 10:00 - 15:00
            <br />
            Sunday closed
          </p>
        </li>
      </ul>
    </section>
  );
}
