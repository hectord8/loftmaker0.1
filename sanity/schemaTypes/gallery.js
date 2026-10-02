import { defineField, defineType } from "sanity";

/**
 * Gallery.
 *
 * The two fixes that matter for SEO and accessibility:
 *   - altText is required on every image, so a photo cannot be published with
 *     no description for a screen-reader user;
 *   - location and buildType are per image, so the gallery page can describe
 *     each project and link it back to its case study.
 */
export default defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Gallery title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      description: "Town or district this set of photographs is from.",
      type: "string",
    }),
    defineField({
      name: "projectSlug",
      title: "Linked project",
      description:
        "Optional. Slug of a Project document this gallery belongs to, so images link to the case study.",
      type: "slug",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          name: "galleryImage",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "altText",
              title: "Alt text",
              description:
                "Required. Describe the photograph, and say where the work is if you know it.",
              type: "string",
              validation: (Rule) => Rule.required().max(160),
            }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
            defineField({
              name: "location",
              title: "Location",
              type: "string",
            }),
            defineField({
              name: "buildType",
              title: "Build type",
              type: "string",
              options: {
                list: [
                  { title: "Loft conversion", value: "loft-conversion" },
                  { title: "Dormer", value: "dormer" },
                  { title: "Hip-to-gable", value: "hip-to-gable" },
                  { title: "Mansard roof", value: "mansard" },
                  { title: "Side extension", value: "side-extension" },
                  { title: "Rear extension", value: "rear-extension" },
                  { title: "Flat roofing", value: "flat-roofing" },
                  { title: "Structural steelwork", value: "structural-steel" },
                ],
              },
            }),
            defineField({
              name: "featured",
              title: "Show on front page",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { media: "image", title: "altText", subtitle: "location" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "location" },
  },
});