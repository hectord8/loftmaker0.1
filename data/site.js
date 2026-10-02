/**
 * Single source of truth for business, contact and SEO details.
 *
 * Anything the owner has not confirmed yet is set to `null` and omitted from
 * rendered output and structured data. Never replace a `null` with a guess.
 *
 * OWNER TO PROVIDE (see SEO handover notes):
 *  - address            full postal address, or confirmation the business is
 *                       service-area only and the areas it covers
 *  - geo                latitude / longitude for the address above
 *  - legalName          registered company name
 *  - companyNumber      Companies House registration number
 *  - vatNumber          VAT registration number
 *  - insurance          public liability / employers liability provider + level
 *  - warrantyProvider   provider behind the 10-year structural warranty
 */

export const site = {
  name: "Loft Maker London",
  // Canonical origin. No trailing slash: Next.js serves URLs without one, so
  // canonicals and internal links all use this exact form.
  url: "https://www.lmlbuild.uk",

  description:
    "Loft Maker London builds loft conversions, side extensions, GRP flat roofs and structural steelwork for homeowners across London and Essex.",

  // The file was named .png but has always contained JPEG bytes (magic ffd8ff).
  // next/image sniffs the buffer so it was being optimised fine, but serving
  // JPEG data under a .png name is misleading to crawlers and scrapers.
  logo: "/logo.jpg",
  defaultOgImage: "/og/loft-maker-london-og.jpg",
  defaultOgImageAlt:
    "Completed loft conversion and extension by Loft Maker London",

  // Phone is stored twice so display and href formats can never drift apart.
  phoneDisplay: "07736 777527",
  phoneE164: "+447736777527",
  telHref: "tel:+447736777527",

  email: "loftmaker@live.co.uk",

  contactName: "Craig Darrach",
  contactRole: "Founder",

  // Null until the owner supplies them. Rendered and emitted only when set.
  legalName: null,
  address: null,
  geo: null,
  companyNumber: null,
  vatNumber: null,
  insurance: null,
  warrantyProvider: null,

  warrantyYears: 10,

  openingHours: [
    { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
    { dayOfWeek: ["Saturday"], opens: "10:00", closes: "15:00" },
  ],
  // Sunday closed - omitted from openingHoursSpecification, shown in visible text.
  closedDays: "Sunday",

  // Areas the business states it serves.
  areaServed: [
    { "@type": "City", name: "London" },
    { "@type": "AdministrativeArea", name: "Essex" },
    { "@type": "Place", name: "Chingford" },
    { "@type": "Place", name: "South Woodford" },
  ],

  instagram: "https://www.instagram.com/lmlbuildlondon/",
  // Add any further profiles the owner supplies here.
  otherProfiles: [],
};

/** Human-readable opening hours, used in the footer and on the contact page. */
export const openingHoursText = [
  "Monday to Friday: 08:00 - 18:00",
  "Saturday: 10:00 - 15:00",
  "Sunday: closed",
];

/**
 * Areas named in the footer and on the /areas page. Kept separate from the
 * schema.org `areaServed` list so the visible copy can stay readable.
 */
export const areaNames = ["London", "Essex", "Chingford", "South Woodford"];
