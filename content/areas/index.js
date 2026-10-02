/**
 * Area page registry.
 *
 * An area page is published by adding one file here and one import. The
 * /areas/[area] route, the sitemap and the footer all read from this list, so
 * a new area page is one entry rather than a new set of files.
 *
 * NO AREA PAGES ARE PUBLISHED YET - the owner asked for them to be skipped in
 * this pass, so the array is intentionally empty and /areas/<name> returns a
 * 404 until an entry is added.
 *
 * Shape of an entry, using the London Borough of Waltham Forest as the worked
 * example of the *structure* only. The copy itself has to be written for the
 * area in question and checked against the borough's current planning
 * information before it is published.
 *
 *   {
 *     slug: "chingford",
 *     href: "/areas/chingford",
 *     navLabel: "Chingford",
 *     title: "Loft Conversions in Chingford | Loft Maker London",
 *     h1: "Loft Conversions and Extensions in Chingford",
 *     metaDescription: "...",            // about 150 characters
 *     eyebrow: "Chingford, London E4",
 *     lede: "one or two sentences for the page header",
 *     borough: "London Borough of Waltham Forest",
 *     planningAuthority: "London Borough of Waltham Forest",
 *     sections: [{ id, heading, body: [], list: [] }],   // 600-1000 words total
 *     faqs: [{ question, answer }],      // only what is visible on the page
 *     projectSlugs: [],                  // Sanity project slugs to link to
 *     related: ["loft-conversions", "side-extensions"],
 *   }
 */

export const areas = [];

/** Empty until area pages are published. */
export const areaCards = areas
  .map((area) => ({
    slug: area.slug,
    href: area.href,
    label: area.navLabel,
    title: area.title,
    shortDescription: area.lede,
    order: area.slug,
  }))
  .sort((a, b) => a.order.localeCompare(b.order));

export const getAreaBySlug = (slug) => areas.find((area) => area.slug === slug);
