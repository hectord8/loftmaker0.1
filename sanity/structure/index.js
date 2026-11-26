import { singletonTypes } from "../schemaTypes";

const singleton = (S, type, title) =>
  S.listItem()
    .title(title)
    .id(type)
    .child(S.document().schemaType(type).documentId(type).title(title));

// Editor-friendly sidebar: one-off pages first, then collections.
export const structure = (S) =>
  S.list()
    .title("Content")
    .items([
      singleton(S, "homePage", "Homepage"),
      singleton(S, "loftHub", "Loft conversions page"),
      S.listItem()
        .title("Loft type pages")
        .child(
          S.documentList()
            .title("Loft type pages")
            .schemaType("loftPage")
            .filter('_type == "loftPage" && pageType == "type"')
            .initialValueTemplates([S.initialValueTemplateItem("loftPage-type")])
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      S.listItem()
        .title("Area pages")
        .child(
          S.documentList()
            .title("Area pages")
            .schemaType("loftPage")
            .filter('_type == "loftPage" && pageType == "area"')
            .initialValueTemplates([S.initialValueTemplateItem("loftPage-area")])
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      S.divider(),
      S.documentTypeListItem("project").title("Case studies"),
      S.documentTypeListItem("post").title("Blog posts"),
      S.documentTypeListItem("gallery").title("Gallery"),
      S.divider(),
      singleton(S, "siteSettings", "Site settings"),
    ]);

export const templates = (prev) => [
  ...prev.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
  { id: "loftPage-type", title: "Loft type page", schemaType: "loftPage", value: { pageType: "type" } },
  { id: "loftPage-area", title: "Area page", schemaType: "loftPage", value: { pageType: "area" } },
];

export const documentActions = (prev, { schemaType }) =>
  singletonTypes.includes(schemaType)
    ? prev.filter(({ action }) => ["publish", "discardChanges", "restore"].includes(action))
    : prev;
