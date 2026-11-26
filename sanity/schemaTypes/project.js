import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Case study",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } }),
    defineField({
      name: "loftType",
      title: "Project type",
      type: "string",
      options: {
        list: ["Dormer", "Hip-to-gable", "Mansard", "Rooflight", "Extension", "Other"],
      },
    }),
    defineField({ name: "area", title: "Area", type: "string", description: "e.g. Chingford" }),
    defineField({ name: "duration", title: "Build time", type: "string", description: "e.g. 8 weeks" }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "coverImage", title: "Cover image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "images",
      title: "More photos",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Description", type: "string" }],
        }),
      ],
    }),
    defineField({ name: "testimonial", title: "Client quote", type: "text", rows: 3 }),
    defineField({ name: "clientName", title: "Client name (e.g. “Sarah, Chingford”)", type: "string" }),
    defineField({
      name: "featured",
      title: "Show on the homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", type: "loftType", area: "area", media: "coverImage" },
    prepare: ({ title, type, area, media }) => ({
      title,
      subtitle: [type, area].filter(Boolean).join(" · "),
      media,
    }),
  },
});
