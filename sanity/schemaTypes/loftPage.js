import { defineArrayMember, defineField, defineType } from "sanity";

import { sectionsField } from "./objects/sections";

export default defineType({
  name: "loftPage",
  title: "Loft page",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "sections", title: "Page sections" },
    { name: "faqs", title: "FAQs" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Page name", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      group: "content",
      description: "Appears as /loft-conversions/<this>.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pageType",
      title: "Page type",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Loft type (e.g. dormer, mansard)", value: "type" },
          { title: "Area (e.g. Chingford)", value: "area" },
        ],
        layout: "radio",
      },
      initialValue: "type",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "order", title: "Order", type: "number", group: "content", description: "Lower numbers appear first." }),
    defineField({ name: "eyebrow", title: "Small line above the headline", type: "string", group: "content" }),
    defineField({ name: "heading", title: "Headline", type: "string", group: "content" }),
    defineField({ name: "summary", title: "Short summary (used on cards)", type: "text", rows: 3, group: "content" }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true }, group: "content" }),
    defineField({
      name: "highlights",
      title: "Key points",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      description: "Short bullet points, e.g. “Ideal for semi-detached homes”.",
    }),
    defineField({ name: "body", title: "Main content", type: "richText", group: "content" }),
    defineField({
      name: "projects",
      title: "Case studies to show",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
    }),
    sectionsField("sections"),
    defineField({ name: "faqs", title: "FAQs", type: "array", group: "faqs", of: [defineArrayMember({ type: "faq" })] }),
    defineField({ name: "cta", title: "Call to action", type: "cta", group: "content" }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", pageType: "pageType", media: "heroImage" },
    prepare: ({ title, pageType, media }) => ({
      title,
      subtitle: pageType === "area" ? "Area page" : "Loft type page",
      media,
    }),
  },
});
