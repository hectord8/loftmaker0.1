import Link from "next/link";

import JsonLd from "@/Components/Seo/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";
import styles from "./inner.module.css";

/**
 * Visible breadcrumb trail plus matching BreadcrumbList structured data.
 * `trail` runs from Home to the current page; the last item is the current page.
 */
export default function Breadcrumbs({ trail = [] }) {
  if (trail.length < 2) return null;

  return (
    <>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <ol>
          {trail.map((item, index) => {
            const isCurrent = index === trail.length - 1;
            return (
              <li key={item.path}>
                {isCurrent ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <Link href={item.path}>{item.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
