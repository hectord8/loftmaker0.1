import { defineField, defineType } from "sanity";

export default defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "text", type: "text", rows: 3 }),
    defineField({ name: "buttonLabel", title: "Button label", type: "string" }),
  ],
});
