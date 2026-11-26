import { defineArrayMember, defineField, defineType } from "sanity";

import { sectionsField } from "./objects/sections";

export default defineType({
  name: "loftHub",
  title: "Loft conversions page",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "sections", title: "Page sections" },
    { name: "process", title: "Process" },
    { name: "faqs", title: "FAQs" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "eyebrow", title: "Small line above the headline", type: "string", group: "content" }),
    defineField({ name: "heading", title: "Headline", type: "string", group: "content" }),
    defineField({ name: "intro", title: "Intro text", type: "text", rows: 4, group: "content" }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true }, group: "content" }),
    defineField({
      name: "trustPoints",
      title: "Trust points",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "typesHeading", title: "Loft types heading", type: "string", group: "content" }),
    defineField({ name: "areasHeading", title: "Areas heading", type: "string", group: "content" }),
    defineField({ name: "body", title: "Main content", type: "richText", group: "content" }),
    defineField({ name: "processHeading", title: "Process heading", type: "string", group: "process" }),
    defineField({
      name: "processSteps",
      title: "Process steps",
      type: "array",
      group: "process",
      of: [
        defineArrayMember({
          type: "object",
          name: "step",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "text", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
    }),
    sectionsField("sections"),
    defineField({ name: "faqs", title: "FAQs", type: "array", group: "faqs", of: [defineArrayMember({ type: "faq" })] }),
    defineField({ name: "cta", title: "Call to action", type: "cta", group: "content" }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Loft conversions page" }) },
});
