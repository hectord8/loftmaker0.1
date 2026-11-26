// Default wording for every editable section. The site shows these until the
// matching field is filled in Sanity Studio (/studio), so nothing breaks while
// content is being set up. `npm run seed:content` copies them into Sanity.
import { site } from "./site.js";
import { services } from "./services.js";
import { projectImages } from "./projects.js";
import { loftHubContent, loftPageContent } from "./loftContent.js";

export const defaultSiteSettings = {
  name: site.name,
  phone: site.phone,
  email: site.email,
  contactName: "Craig Darrach",
  address: {
    street: site.address.street,
    town: site.address.town,
    county: site.address.county,
    postcode: site.address.postcode,
  },
  instagram: site.instagram,
  areaServed: site.areaServed,
  officeHours: ["Mon–Fri 8:00–18:00", "Sat 10:00–15:00", "Sunday CLOSED"],
  footerHeading: "Loft Maker London",
  footerText:
    "Reliable construction services London homeowners count on. No-nonsense contracting across London and Essex.",
  seoTitle: site.title,
  seoDescription: site.description,
  seoKeywords: site.keywords,
};

export const defaultHomePage = {
  heroEyebrow: "Reliable construction services across London and Essex",
  heroHeading: "Complex problems, innovative solutions.",
  heroText:
    "From start to finish, we make sure your home renovation project delivers what you need, with clear pricing and honest timelines.",
  heroButtonLabel: "Get in touch for a free consultation",
  trustPoints: [
    "10-year structural warranty",
    "Planning & permissions handled",
    "In-house steel & roofing",
    "Free, no-obligation consultation",
  ],
  introHeading: "Complex Problems, innovative solutions",
  introText:
    "From start to finish, we make sure your home renovation London project delivers what you need. We do loft conversions, extensions, and full home renovations across London and Essex — from Chingford to South Woodford. Every job gets the same straightforward approach: clear pricing, honest timelines, and work we're happy to stand behind. Whether it's a simple conversion or something more involved, we'll talk through your options and find what works for your home and your budget.",
  introSubheading: "Get in touch for a free, no-obligation consultation.",
  introButtonLabel: "Tell us about your project",
  servicesHeading: "What We Do",
  servicesText:
    "At Loft Maker London, we believe every property has untapped potential. Whether it's a side return, a rear extension, an unused outbuilding, or a full structural overhaul, we specialise in bringing spaces to life — creating homes that work harder for the people who live in them. From the moment you get in touch, we take care of everything. Our in-house team handles the full journey: design and planning, structural engineering, roofing, steelwork, groundworks, and all the finishing touches that make a house feel like a home. One team, one point of contact, zero hassle. Every project we deliver is backed by a 10-year structural warranty — because we build things to last, and we stand behind every job we do. We don't cut corners and we don't settle for anything less than work we're genuinely proud of.",
  services: services.map((s) => ({
    title: s.title,
    description: s.description,
  })),
  projectsHeading: "Previous Project",
  projectImages: projectImages.map((img, i) => ({
    url: img.url,
    alt: `Previous loft conversion / extension project photo ${i + 1}`,
  })),
  galleryHeading: "Projects",
  contactEyebrow: "Get in touch",
  contactHeading: "Get in touch for a free, no-obligation consultation.",
  contactText:
    "Tell us about your home renovation project and we'll talk through your options to find what works for your home and your budget.",
};

export const defaultLoftHub = {
  eyebrow: "Loft conversions across London & Essex",
  heading: "Loft conversions, designed, approved and built by one team.",
  intro:
    "Turn the space you already own into a bedroom, office or suite. We handle design, planning, structural steel, roofing and the finishing touches, with one point of contact from first visit to sign-off.",
  trustPoints: defaultHomePage.trustPoints,
  typesHeading: "Types of loft conversion",
  areasHeading: "Areas we cover",
  processHeading: "How it works",
  processSteps: [
    { title: "Free consultation", text: "We visit, look at your loft and talk through what's possible for your home and budget." },
    { title: "Design & planning", text: "We prepare the drawings and handle planning or permitted development and building regulations." },
    { title: "Structure & build", text: "Our in-house team installs the steelwork, roof and structure — no subcontractor gaps." },
    { title: "Finish & sign-off", text: "Stairs, insulation, plastering and the finishing touches, signed off and backed by our 10-year structural warranty." },
  ],
  body: loftHubContent.body,
  sections: loftHubContent.sections,
  faqs: loftHubContent.faqs,
  cta: {
    heading: "Find out what your loft could become.",
    text: "Book a free, no-obligation consultation and we'll talk through the options for your home.",
    buttonLabel: "Book a free consultation",
  },
};

export const defaultLoftPages = [
  {
    title: "Dormer loft conversions",
    slug: "dormer",
    ...loftPageContent["dormer"],
    pageType: "type",
    order: 1,
    eyebrow: "Loft conversions",
    heading: "Dormer loft conversions",
    summary: "A box-shaped extension from the roof slope that adds full head height and usable floor space.",
    highlights: [
      "Adds head height and floor space",
      "Suits most terraced, semi-detached and detached homes",
      "Room for a bedroom with an en-suite",
    ],
  },
  {
    title: "Hip-to-gable loft conversions",
    slug: "hip-to-gable",
    ...loftPageContent["hip-to-gable"],
    pageType: "type",
    order: 2,
    eyebrow: "Loft conversions",
    heading: "Hip-to-gable loft conversions",
    summary: "Straightens the sloping side of a hipped roof into a vertical gable wall to open up the loft.",
    highlights: [
      "Ideal for semi-detached and end-of-terrace homes",
      "Often combined with a rear dormer",
      "Makes room for a proper staircase",
    ],
  },
  {
    title: "Mansard loft conversions",
    slug: "mansard",
    ...loftPageContent["mansard"],
    pageType: "type",
    order: 3,
    eyebrow: "Loft conversions",
    heading: "Mansard loft conversions",
    summary: "Rebuilds the roof with a near-vertical slope to create the most internal space of any loft type.",
    highlights: [
      "The most space of any loft conversion",
      "Popular on London terraces",
      "Planning handled for you",
    ],
  },
];
