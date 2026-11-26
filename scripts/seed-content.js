// Copies the site's default wording into Sanity so it can be edited in /studio.
// Safe to re-run: missing documents are created; for documents that already
// exist, only fields that are still empty are filled in (plus any default FAQ
// questions not on the page yet). Nothing you've edited is overwritten.
//
//   node scripts/seed-content.js            # create anything missing
//   node scripts/seed-content.js --dry-run  # show what would be created
import { createClient } from "@sanity/client";
import dotenv from "dotenv";

import {
  defaultHomePage,
  defaultLoftHub,
  defaultLoftPages,
  defaultSiteSettings,
} from "../data/content.js";

dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();
const token = process.env.SANITY_TOKEN?.trim();
const dryRun = process.argv.includes("--dry-run");

if (!projectId || !dataset || (!token && !dryRun)) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET or SANITY_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-10-01", useCdn: false });

let keyCounter = 0;
const key = () => `seed${(keyCounter++).toString(36)}`;
const withKeys = (items) => items.map((item) => (typeof item === "object" ? { _key: key(), ...item } : item));

// Static image paths (e.g. /Current-project-images/1.jpg) can't be stored as
// Sanity images, so those fields are left empty and the site keeps its photos.
const { projectImages: _staticImages, services, ...homeFields } = defaultHomePage;

const docs = [
  { _id: "siteSettings", _type: "siteSettings", ...defaultSiteSettings },
  { _id: "homePage", _type: "homePage", ...homeFields, services: withKeys(services) },
  {
    _id: "loftHub",
    _type: "loftHub",
    ...defaultLoftHub,
    processSteps: withKeys(defaultLoftHub.processSteps),
    faqs: withKeys(defaultLoftHub.faqs),
  },
  ...defaultLoftPages.map(({ slug, ...page }) => ({
    _id: `loftPage-${slug}`,
    _type: "loftPage",
    ...page,
    slug: { _type: "slug", current: slug },
  })),
];

const existingDocs = await client.fetch(`*[_id in $ids]{_id, body, sections, faqs}`, { ids: docs.map((d) => d._id) });
const existing = new Map(existingDocs.map((doc) => [doc._id, doc]));

const fillable = ["body", "sections", "faqs"];
const tx = client.transaction();
let changes = 0;

for (const doc of docs) {
  const current = existing.get(doc._id);
  if (!current) {
    console.log(`${dryRun ? "would create" : "create"}  ${doc._id}`);
    tx.createIfNotExists(doc);
    changes++;
    continue;
  }

  const missing = {};
  for (const field of fillable) {
    const value = current[field];
    if (doc[field] && (value === undefined || value === null || (Array.isArray(value) && value.length === 0))) {
      missing[field] = doc[field];
    }
  }
  const newFaqs =
    current.faqs?.length && doc.faqs?.length
      ? doc.faqs.filter((faq) => !current.faqs.some((f) => f.question?.trim() === faq.question.trim()))
      : [];

  const notes = [...Object.keys(missing), ...(newFaqs.length ? [`${newFaqs.length} new FAQ(s)`] : [])];
  if (notes.length === 0) {
    console.log(`up to date  ${doc._id}`);
    continue;
  }
  console.log(`${dryRun ? "would fill" : "fill"}  ${doc._id}: ${notes.join(", ")}`);
  let patch = client.patch(doc._id).setIfMissing(missing);
  if (newFaqs.length) patch = patch.append("faqs", newFaqs);
  tx.patch(patch);
  changes++;
}

if (dryRun || changes === 0) process.exit(0);

await tx.commit();
console.log(`Done — updated ${changes} document(s). Edit them at /studio.`);
