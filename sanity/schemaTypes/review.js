import { defineField, defineType } from "sanity";

/**
 * Customer review.
 *
 * Reviews are only ever created from real feedback the business has received.
 * `published` defaults to false so nothing reaches the site by accident, and
 * there is no aggregateRating field anywhere: a star rating must be computed
 * from real reviews, and is better omitted entirely until they exist.
 */
export default defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Customer name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "area",
      title: "Area",
      description: "Town or district only, e.g. 'Chingford'.",
      type: "string",
    }),
    defineField({ name: "projectType", title: "Project type", type: "string" }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "text",
      title: "Review",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "date", title: "Date received", type: "date" }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "order", title: "Display order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "projectType" },
  },
});