import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  description: "How this page appears on Google and when shared. Leave blank to use the defaults.",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Page title (Google)",
      type: "string",
      validation: (rule) => rule.max(70).warning("Google shows roughly 60–70 characters."),
    }),
    defineField({
      name: "description",
      title: "Description (Google)",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160).warning("Google shows roughly 155–160 characters."),
    }),
    defineField({ name: "image", title: "Share image", type: "image" }),
  ],
});
