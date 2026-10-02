import Link from "next/link";

import { serviceCards } from "@/data/services";
import { site } from "@/data/site";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * 404 page.
 *
 * Replaces the bare Next.js default. It links the main service pages so a
 * mistyped or stale URL still leads somewhere useful, which is the whole point
 * of a 404 page on a site this small.
 */
export default function NotFound() {
  return (
    <div className={styles.page}>
      <p className={styles.code}>404</p>
      <h1>We couldn&apos;t find that page</h1>
      <p className={styles.lede}>
        The link may be out of date, or the address may have a typo in it. Here
        is the quickest way back.
      </p>

      <nav className={styles.links} aria-label="Popular pages">
        <Link href="/">Home</Link>
        <Link href="/services">Services</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <div className={styles.services}>
        <h2>What we do</h2>
        <ul>
          {serviceCards.map((service) => (
            <li key={service.href}>
              <Link href={service.href}>{service.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <p className={styles.contact}>
        If you were looking for something in particular, call{" "}
        <a href={site.telHref} data-call-placement="404">
          {site.phoneDisplay}
        </a>{" "}
        or email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </div>
  );
}