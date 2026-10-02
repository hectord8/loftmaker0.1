import Link from "next/link";

import { site } from "@/data/site";
import styles from "./inner.module.css";

/**
 * Closing call to action, reused at the foot of every service, area and
 * project page so each one has a route into the contact form.
 */
export default function CtaBand({
  heading = "Tell us about your project",
  body = "Send a few details and we'll come back to you with honest advice on what is possible, what it involves and how long it takes.",
  id = "contact",
} = {}) {
  return (
    <section className={styles.cta} id={id} aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`}>{heading}</h2>
      <p>{body}</p>
      <div className={styles.ctaActions}>
        <Link className="siteButton siteButtonPrimary" href="/contact">
          Get a free consultation
        </Link>
        <a
          className={`siteButton ${styles.callButton}`}
          href={site.telHref}
          data-call-placement="cta-band"
        >
          Call {site.phoneDisplay}
        </a>
      </div>
    </section>
  );
}
