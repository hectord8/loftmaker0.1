import { site } from "@/data/site";
import { absoluteUrl } from "./seo";

/** Stable @id so Service nodes can point at the business with `provider`. */
export const BUSINESS_ID = `${site.url}/#business`;

/**
 * Placeholder-free business node. Fields the owner has not supplied are
 * omitted entirely rather than emitted empty.
 *
 * Deliberately absent until real data exists: address, geo, aggregateRating,
 * review, priceRange. Never add a review or rating without a real source.
 */
export function businessSchema() {
  const node = {
    "@type": "HomeAndConstructionBusiness",
    "@id": BUSINESS_ID,
    name: site.name,
    url: site.url,
    description: site.description,
    image: absoluteUrl(site.defaultOgImage),
    logo: absoluteUrl(site.logo),
    telephone: site.phoneE164,
    email: site.email,
    sameAs: [site.instagram, ...site.otherProfiles],
    areaServed: site.areaServed,
    openingHoursSpecification: site.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.dayOfWeek,
      opens: slot.opens,
      closes: slot.closes,
    })),
    founder: {
      "@type": "Person",
      name: site.contactName,
      jobTitle: site.contactRole,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer enquiries",
      telephone: site.phoneE164,
      email: site.email,
      areaServed: ["GB"],
      availableLanguage: ["English"],
    },
  };

  // Only emitted once the owner has supplied them.
  if (site.legalName) node.legalName = site.legalName;
  if (site.address) {
    node.address = {
      "@type": "PostalAddress",
      ...site.address,
    };
  }
  if (site.geo) {
    node.geo = {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    };
  }

  return node;
}

/** Service node for a single service page, linked back to the business. */
export function serviceSchema({
  name,
  description,
  path,
  serviceType = name,
  image,
  imageAlt,
} = {}) {
  return {
    "@type": "Service",
    name,
    serviceType,
    ...(description ? { description } : {}),
    ...(path ? { url: absoluteUrl(path) } : {}),
    ...(image
      ? { image: absoluteUrl(image), ...(imageAlt ? { description: imageAlt } : {}) }
      : {}),
    provider: { "@id": BUSINESS_ID },
    areaServed: site.areaServed,
  };
}

/**
 * BreadcrumbList. `trail` is ordered from Home to the current page, e.g.
 * [{ name: "Home", path: "/" }, { name: "Loft Conversions", path: "/loft-conversions" }]
 */
export function breadcrumbSchema(trail = []) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * FAQPage. Only call this where the same questions and answers are rendered
 * visibly on the page - see Components/Seo/FaqSection.js.
 */
export function faqSchema(faqs = []) {
  if (!faqs.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * BlogPosting. Used for editorial content only.
 *
 * No aggregateRating, no review and no author URL unless the owner supplies a
 * real person to attribute the article to - an unattributed author claim is
 * worse than none. `author` falls back to the known business contact.
 */
export function articleSchema({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  image,
  authorName = site.contactName,
} = {}) {
  return {
    "@type": "BlogPosting",
    headline,
    ...(description ? { description } : {}),
    ...(path ? { mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) } } : {}),
    ...(image ? { image } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(authorName ? { author: { "@type": "Person", name: authorName } } : {}),
    publisher: { "@id": BUSINESS_ID },
    isPartOf: { "@id": `${site.url}/#website` },
  };
}

/**
 * CaseStudy / CreativeWork for a project page.
 *
 * Only emitted for projects that exist in Sanity. There is no template version
 * of this that fakes a customer, a location or a photograph.
 */
export function projectSchema({
  title,
  description,
  path,
  location,
  services = [],
  image,
  imageAlt,
  datePublished,
} = {}) {
  return {
    "@type": "CreativeWork",
    name: title,
    ...(description ? { description } : {}),
    ...(path ? { url: absoluteUrl(path) } : {}),
    ...(image ? { image, ...(imageAlt ? { caption: imageAlt } : {}) } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(location ? { locationCreated: { "@type": "Place", name: location } } : {}),
    ...(services.length
      ? {
          about: services.map((service) => ({
            "@type": "Service",
            name: service,
            provider: { "@id": BUSINESS_ID },
          })),
        }
      : {}),
    creator: { "@id": BUSINESS_ID },
  };
}

/** ItemList for a collection such as /projects or /blog. */
export function itemListSchema({ name, path, items = [] } = {}) {
  return {
    "@type": "ItemList",
    name,
    ...(path ? { url: absoluteUrl(path) } : {}),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
