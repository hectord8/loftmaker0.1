import loftConversions from "./loft-conversions";
import dormer from "./dormer";
import hipToGable from "./hip-to-gable";
import mansard from "./mansard";
import sideExtensions from "./side-extensions";
import grpFlatRoofing from "./grp-flat-roofing";
import structuralSteel from "./structural-steel";

/**
 * Every service page is registered here. Adding a service means adding one
 * file and one line: routing, navigation, the sitemap, breadcrumbs and
 * structured data all read from this list.
 */
export const allServices = [
  loftConversions,
  dormer,
  hipToGable,
  mansard,
  sideExtensions,
  grpFlatRoofing,
  structuralSteel,
];

/** Top-level entries, in navigation order. */
export const topLevelServices = allServices
  .filter((service) => !service.parent)
  .sort((a, b) => a.order - b.order);

export const childServices = (parentSlug) =>
  allServices.filter((service) => service.parent === parentSlug);

export const getServiceBySlug = (slug) =>
  allServices.find((service) => service.slug === slug);

export const getServiceByHref = (href) =>
  allServices.find((service) => service.href === href);

/** Card data for the services hub, the homepage and the footer. */
export const serviceCards = allServices
  .map((service) => ({
    slug: service.slug,
    parent: service.parent || null,
    href: service.href,
    label: service.navLabel,
    title: service.title,
    shortDescription: service.shortDescription,
    imageAlt: service.imageAlt || null,
    order: service.order ?? 99,
  }))
  .sort((a, b) => a.order - b.order);

export const topLevelServiceCards = serviceCards.filter((card) => !card.parent);
