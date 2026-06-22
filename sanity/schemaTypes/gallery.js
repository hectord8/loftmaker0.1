export default {
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Gallery Title",
      type: "string",
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
            {
              name: "featured",
              title: "Show on Front Page",
              type: "boolean",
              initialValue: false,
            },
          ],
          preview: {
            select: { media: "image", title: "caption" },
          },
        },
      ],
    },
  ],
}
