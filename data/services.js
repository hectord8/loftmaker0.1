import {
  topLevelServiceCards,
  serviceCards,
  allServices,
  getServiceBySlug,
  getServiceByHref,
} from "@/content/services";

/**
 * Backwards-compatible facade over content/services.
 *
 * The `services` shape ({ title, slug, href, description }) is kept because
 * several components still consume it, but everything is derived from the
 * content registry so slugs, links, navigation, the sitemap and the structured
 * data can never drift apart.
 */
export const services = topLevelServiceCards.map((card) => ({
  title: card.title,
  label: card.label,
  slug: card.slug,
  href: card.href,
  description: card.shortDescription,
  shortDescription: card.shortDescription,
  summary: card.shortDescription,
}));

export { serviceCards, topLevelServiceCards, allServices, getServiceBySlug, getServiceByHref };