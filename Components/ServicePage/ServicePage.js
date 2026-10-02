import Link from "next/link";

import Breadcrumbs from "@/Components/Seo/Breadcrumbs";
import CtaBand from "@/Components/Seo/CtaBand";
import FaqSection from "@/Components/Seo/FaqSection";
import JsonLd from "@/Components/Seo/JsonLd";
import PageHeader, { defaultHeaderActions } from "@/Components/Seo/PageHeader";
import Placeholder from "@/Components/Seo/Placeholder";
import { faqsForService } from "@/content/faqs";
import { getServiceBySlug } from "@/content/services";
import { serviceSchema } from "@/lib/jsonld";
import styles from "@/Components/Seo/inner.module.css";

/**
 * Renders one service from the registry in content/services.
 *
 * Adding a service is one file plus one line in content/services/index.js:
 * routing, navigation, breadcrumbs, related links, the sitemap and the
 * structured data all follow automatically.
 *
 * `trail` is passed in rather than built here, because the same renderer is
 * used for top-level services (/loft-conversions) and children
 * (/loft-conversions/dormer) and the breadcrumb depth differs.
 */
export default function ServicePage({ service, trail }) {
  if (!service) return null;

  const children = service.children || [];
  const relatedCards = (service.related || [])
    .map((slug) => getServiceBySlug(slug))
    .filter(Boolean);
  const faqs = [...(service.faqs || []), ...faqsForService(service.slug)];

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: service.title,
          serviceType: service.serviceType,
          description: service.metaDescription,
          path: service.href,
          image: service.imageAlt ? service.image : undefined,
          imageAlt: service.imageAlt,
        })}
      />
      <Breadcrumbs trail={trail} />

      <PageHeader
        eyebrow="Loft Maker London"
        h1={service.h1}
        lede={service.lede || service.shortDescription}
        actions={defaultHeaderActions}
      />

      <div className={styles.prose}>
        {service.intro?.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>

      {service.sections?.map((section) => (
        <section key={section.id} className={styles.prose} aria-labelledby={section.id}>
          <h2 id={section.id}>{section.heading}</h2>
          {section.body?.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          {section.list ? (
            <ul>
              {section.list.map((item) => (
                <li key={item.slice(0, 40)}>{item}</li>
              ))}
            </ul>
          ) : null}
          {section.after?.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          {section.placeholder ? <Placeholder text={section.placeholder} /> : null}
        </section>
      ))}

      {children.length ? (
        <section className={styles.prose} aria-labelledby="in-this-service">
          <h2 id="in-this-service">In this service</h2>
          <ul>
            {children.map((child) => (
              <li key={child.href}>
                <Link href={child.href}>{child.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {relatedCards.length ? (
        <section className={styles.prose} aria-labelledby="related-services">
          <h2 id="related-services">Related services</h2>
          <ul>
            {relatedCards.map((card) => (
              <li key={card.href}>
                <Link href={card.href}>{card.title}</Link> &mdash; {card.shortDescription}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <FaqSection faqs={faqs} />
      <CtaBand />
    </>
  );
}