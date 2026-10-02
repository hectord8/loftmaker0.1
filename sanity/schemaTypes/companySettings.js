import { defineField, defineType } from "sanity";

/**
 * Company facts.
 *
 * One document holding the facts the site cannot invent: registered company
 * name and number, VAT number, founding year, team, insurance and the provider
 * behind the structural warranty. Every field is optional and the site omits
 * whatever is left blank - including the company number, which must not be
 * guessed or copied from another business.
 */
export default defineType({
  name: "companySettings",
  title: "Company settings",
  type: "document",
  fields: [
    defineField({ name: "legalName", title: "Registered company name", type: "string" }),
    defineField({
      name: "companyNumber",
      title: "Companies House number",
      type: "string",
      validation: (Rule) => Rule.regex(/^[A-Z0-9]{8}$/, { name: "8-character company number" }),
    }),
    defineField({ name: "vatNumber", title: "VAT number", type: "string" }),
    defineField({ name: "foundedYear", title: "Year founded", type: "number" }),
    defineField({
      name: "team",
      title: "Team",
      type: "array",
      of: [
        {
          type: "object",
          name: "teamMember",
          fields: [
            defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "role", title: "Role", type: "string" }),
            defineField({ name: "bio", title: "Short biography", type: "text", rows: 4 }),
          ],
          preview: { select: { title: "name", subtitle: "role" } },
        },
      ],
    }),
    defineField({
      name: "teamImage",
      title: "Team photograph",
      type: "image",
      fields: [
        defineField({
          name: "altText",
          title: "Alt text",
          description: "e.g. 'Craig Darrach on a loft conversion site in Chingford'.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "insuranceProvider",
      title: "Insurance provider",
      type: "string",
    }),
    defineField({
      name: "insuranceLevel",
      title: "Public liability cover",
      description: "e.g. '£5 million public liability'.",
      type: "string",
    }),
    defineField({
      name: "warrantyProvider",
      title: "Structural warranty provider",
      type: "string",
    }),
    defineField({ name: "warrantyYears", title: "Structural warranty (years)", type: "number" }),
  ],
  preview: {
    prepare: () => ({ title: "Company settings" }),
  },
});