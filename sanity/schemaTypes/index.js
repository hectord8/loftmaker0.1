import { postType } from "./postType";
import gallery from "./gallery";
import project from "./project";
import siteSettings from "./siteSettings";
import homePage from "./homePage";
import loftHub from "./loftHub";
import loftPage from "./loftPage";
import seo from "./objects/seo";
import faq from "./objects/faq";
import cta from "./objects/cta";
import richText from "./objects/richText";
import { sectionTypes } from "./objects/sections";

// Documents that exist exactly once (edited, never created/duplicated/deleted).
export const singletonTypes = ["siteSettings", "homePage", "loftHub"];

export const schemaTypes = [
  siteSettings,
  homePage,
  loftHub,
  loftPage,
  project,
  postType,
  gallery,
  seo,
  faq,
  cta,
  richText,
  ...sectionTypes,
];
