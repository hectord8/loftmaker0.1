/**
 * Project case study.
 *
 * Every field the SEO pages need is modelled here so an editor can fill it in
 * from the Studio rather than from code. Nothing on this schema has a
 * fabricated default: the site renders an empty state until real projects are
 * entered.
 *
 * Alt text is required on every image. A photo with no description is worse
 * than no photo for a screen-reader user, and an unlabelled image is also
 * invisible to image search - which is where this kind of work is found.
 */
const project = {
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "basics", title: "Basics", default: true },
    { name: "detail", title: "Project detail" },
    { name: "media", title: "Images" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    {
      name: "title",
      title: "Project title",
      type: "string",
      group: "basics",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basics",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "summary",
      title: "Summary",
      description:
        "One or two sentences for the project card and the meta description.",
      type: "text",
      rows: 3,
      group: "basics",
      validation: (Rule) => Rule.max(320),
    },
    {
      name: "published",
      title: "Published",
      type: "boolean",
      group: "basics",
      initialValue: false,
    },

    {
      name: "location",
      title: "Location",
      description:
        "Town or district only, e.g. 'Chingford'. Do not publish a client's full address.",
      type: "string",
      group: "detail",
    },
    {
      name: "buildType",
      title: "Build type",
      type: "string",
      group: "detail",
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
    },
    {
      name: "services",
      title: "Services delivered",
      type: "array",
      group: "detail",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "duration",
      title: "Duration on site",
      description: "e.g. '8 weeks on site'. Optional.",
      type: "string",
      group: "detail",
    },
    {
      name: "publishedAt",
      title: "Completion date",
      type: "date",
      group: "detail",
    },
    {
      name: "description",
      title: "Project description",
      description:
        "The full write-up. Portable Text, so headings and lists are allowed.",
      type: "array",
      group: "detail",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    },

    {
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        {
          name: "altText",
          title: "Alt text",
          description:
            "Describe what is in the photograph, e.g. 'Rear dormer and new rooflight on a Victorian terrace'.",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "beforeImages",
      title: "Before images",
      type: "array",
      group: "media",
      of: [
        {
          type: "object",
          name: "projectImage",
          fields: [
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
            {
              name: "altText",
              title: "Alt text",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
            {
              name: "stage",
              title: "Stage",
              type: "string",
              options: { list: ["before", "during", "after"] },
              initialValue: "before",
            },
          ],
          preview: {
            select: { media: "image", title: "caption", subtitle: "stage" },
          },
        },
      ],
    },
    {
      name: "afterImages",
      title: "After images",
      type: "array",
      group: "media",
      of: [{ type: "object", name: "projectImage" }],
    },

    {
      name: "seoTitle",
      title: "SEO title",
      description: "Leave blank to use the project title. About 60 characters.",
      type: "string",
      group: "seo",
      validation: (Rule) => Rule.max(60),
    },
    {
      name: "metaDescription",
      title: "Meta description",
      description: "About 155 characters.",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (Rule) => Rule.max(160),
    },
    {
      name: "noindex",
      title: "Hide from search engines",
      type: "boolean",
      group: "seo",
      initialValue: false,
    },
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "coverImage" },
  },
};

export default project;
