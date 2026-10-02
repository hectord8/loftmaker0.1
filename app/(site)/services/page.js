import Link from "next/link";

import Breadcrumbs from "@/Components/Seo/Breadcrumbs";
import CtaBand from "@/Components/Seo/CtaBand";
import PageHeader, { defaultHeaderActions } from "@/Components/Seo/PageHeader";
import { serviceCards } from "@/data/services";
import { buildPageMetadata } from "@/lib/seo";
import styles from "@/Components/Seo/inner.module.css";

export const metadata = buildPageMetadata({
  title: "Services",
  description:
    "Loft conversions, dormers, hip-to-gable and mansard roofs, side extensions, GRP flat roofing and structural steelwork across London and Essex.",
  path: "/services",
});

/** Hub page: every service, linked, so the topic cluster has a centre. */
export default function ServicesHub() {
  return (
    <>
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />

      <PageHeader
        eyebrow="What we do"
        h1="Construction services across London and Essex"
        lede="Design, consents, structural engineering and building work, delivered by one in-house team. Every completed project carries a 10-year structural warranty."
        actions={defaultHeaderActions}
      />

      {serviceCards.map((service) => (
        <section key={service.href} className={styles.prose} aria-labelledby={service.href}>
          <h2 id={service.href}>
            <Link href={service.href}>{service.title}</Link>
          </h2>
          <p>{service.shortDescription}</p>
        </section>
      ))}

      <CtaBand />
    </>
  );
}