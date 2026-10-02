import { defineField, defineType } from "sanity";

/**
 * Accreditation or trade membership.
 *
 * Rendered only when a document exists, so the site never displays a badge
 * for a body the business is not actually a member of.
 */
export default defineType({
  name: "accreditation",
  title: "Accreditation",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "issuer", title: "Issued by", type: "string" }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      fields: [
        defineField({
          name: "altText",
          title: "Logo alt text",
          description: "e.g. 'Trading Standards logo'.",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "url",
      title: "Link to directory or membership page",
      type: "url",
      description: "Where a member can be verified.",
    }),
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Display order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "issuer", media: "logo" },
  },
});