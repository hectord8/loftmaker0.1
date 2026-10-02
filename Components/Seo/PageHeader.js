import Link from "next/link";

import { site } from "@/data/site";
import styles from "./inner.module.css";

/**
 * Shared inner-page header. Renders the page's only H1.
 */
export default function PageHeader({ eyebrow, h1, lede, actions }) {
  return (
    <header className={styles.pageHeader}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h1>{h1}</h1>
      {lede ? <p className={styles.lede}>{lede}</p> : null}
      {actions?.length ? (
        <div className={styles.headerActions}>
          {actions.map((action) =>
            action.href?.startsWith("tel:") ? (
              <a
                key={action.label}
                className="siteButton siteButtonSecondaryDark"
                href={action.href}
                data-call-placement={action.placement || "page-header"}
              >
                {action.label}
              </a>
            ) : (
              <Link key={action.label} className="siteButton siteButtonPrimary" href={action.href}>
                {action.label}
              </Link>
            ),
          )}
        </div>
      ) : null}
    </header>
  );
}

/** Default header actions: primary CTA to the contact form, secondary call. */
export const defaultHeaderActions = [
  { label: "Get a free consultation", href: "/contact" },
  { label: `Call ${site.phoneDisplay}`, href: site.telHref, placement: "page-header" },
];
