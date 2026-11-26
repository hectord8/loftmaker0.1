import { defineArrayMember, defineField, defineType } from "sanity";

// Building blocks editors can add, remove and reorder on loft pages.
// Every image is optional: a section without its image simply shows the text.

const photo = (name, title, description) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    description,
    fields: [{ name: "alt", title: "Describe the photo (for Google & screen readers)", type: "string" }],
  });

const simpleText = (name = "text", title = "Text") =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "block",
        styles: [
          { title: "Normal", value: "normal" },
          { title: "Heading 3", value: "h3" },
        ],
      }),
    ],
  });

export const sectionTextImage = defineType({
  name: "sectionTextImage",
  title: "Text + photo",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Small line above the heading", type: "string" }),
    defineField({ name: "heading", type: "string" }),
    simpleText(),
    photo("image", "Photo", "Shown beside the text. Leave empty for text only."),
    defineField({
      name: "imagePosition",
      title: "Photo position",
      type: "string",
      options: { list: [{ title: "Right", value: "right" }, { title: "Left", value: "left" }], layout: "radio", direction: "horizontal" },
      initialValue: "right",
    }),
  ],
  preview: {
    select: { title: "heading", media: "image" },
    prepare: ({ title, media }) => ({ title: title || "Text + photo", subtitle: "Text + photo", media }),
  },
});

export const sectionFeatures = defineType({
  name: "sectionFeatures",
  title: "Feature cards",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "intro", type: "text", rows: 3 }),
    defineField({
      name: "items",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "feature",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "text", type: "text", rows: 3 }),
            photo("image", "Photo (optional)"),
          ],
          preview: { select: { title: "title", subtitle: "text", media: "image" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading", items: "items" },
    prepare: ({ title, items }) => ({ title: title || "Feature cards", subtitle: `Feature cards · ${items?.length || 0}` }),
  },
});

export const sectionKeyFacts = defineType({
  name: "sectionKeyFacts",
  title: "Key facts",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({
      name: "facts",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "fact",
          fields: [
            defineField({ name: "label", type: "string", description: "e.g. “Typical build time”" }),
            defineField({ name: "value", type: "string", description: "e.g. “6–8 weeks”" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Key facts", subtitle: "Key facts" }),
  },
});

export const sectionGallery = defineType({
  name: "sectionGallery",
  title: "Photo gallery",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "intro", type: "text", rows: 2 }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      description: "Hidden on the site until at least one photo is added.",
      options: { layout: "grid" },
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Describe the photo", type: "string" },
            { name: "caption", title: "Caption", type: "string" },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading", images: "images", media: "images.0" },
    prepare: ({ title, images, media }) => ({
      title: title || "Photo gallery",
      subtitle: `Photo gallery · ${images?.length || 0} photos`,
      media,
    }),
  },
});

export const sectionBeforeAfter = defineType({
  name: "sectionBeforeAfter",
  title: "Before & after",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "intro", type: "text", rows: 2 }),
    defineField({
      name: "pairs",
      title: "Photo pairs",
      type: "array",
      description: "Hidden on the site until a pair has both photos.",
      of: [
        defineArrayMember({
          type: "object",
          name: "pair",
          fields: [
            photo("before", "Before"),
            photo("after", "After"),
            defineField({ name: "caption", type: "string" }),
          ],
          preview: { select: { title: "caption", media: "after" }, prepare: ({ title, media }) => ({ title: title || "Before & after", media }) },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading", media: "pairs.0.after" },
    prepare: ({ title, media }) => ({ title: title || "Before & after", subtitle: "Before & after", media }),
  },
});

export const sectionQuote = defineType({
  name: "sectionQuote",
  title: "Client quote",
  type: "object",
  fields: [
    defineField({ name: "quote", type: "text", rows: 4, description: "Hidden on the site until filled in." }),
    defineField({ name: "name", title: "Client name", type: "string" }),
    defineField({ name: "location", title: "Area / project", type: "string" }),
    photo("image", "Photo (optional)"),
  ],
  preview: {
    select: { title: "quote", subtitle: "name", media: "image" },
    prepare: ({ title, subtitle, media }) => ({ title: title || "Client quote (empty)", subtitle: subtitle || "Client quote", media }),
  },
});

export const sectionCtaBanner = defineType({
  name: "sectionCtaBanner",
  title: "Call-to-action banner",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "text", type: "text", rows: 2 }),
    defineField({ name: "buttonLabel", title: "Button label", type: "string" }),
    photo("image", "Background photo (optional)"),
  ],
  preview: {
    select: { title: "heading", media: "image" },
    prepare: ({ title, media }) => ({ title: title || "Call-to-action banner", subtitle: "Banner", media }),
  },
});

export const sectionTypes = [
  sectionTextImage,
  sectionFeatures,
  sectionKeyFacts,
  sectionGallery,
  sectionBeforeAfter,
  sectionQuote,
  sectionCtaBanner,
];

export const sectionsField = (group) =>
  defineField({
    name: "sections",
    title: "Page sections",
    type: "array",
    group,
    description: "Add, remove and drag to reorder. Each section can hold its own photos.",
    of: sectionTypes.map((type) => defineArrayMember({ type: type.name })),
  });
