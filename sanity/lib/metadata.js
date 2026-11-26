import { imageUrl } from "./content";

// Builds Next metadata from a Sanity `seo` object, falling back to the site defaults.
export function pageMetadata(seo = {}, { path, title, description, image } = {}) {
  const finalTitle = seo?.title || title;
  const finalDescription = seo?.description || description;
  const shareImage = imageUrl(seo?.image, 1200, 630) || image;

  const metadata = { alternates: { canonical: path } };
  if (finalTitle) metadata.title = finalTitle;
  if (finalDescription) metadata.description = finalDescription;

  const openGraph = { url: path };
  if (finalTitle) openGraph.title = finalTitle;
  if (finalDescription) openGraph.description = finalDescription;
  if (shareImage) openGraph.images = [{ url: shareImage, width: 1200, height: 630 }];
  metadata.openGraph = openGraph;

  if (finalTitle || shareImage) {
    metadata.twitter = { card: "summary_large_image" };
    if (finalTitle) metadata.twitter.title = finalTitle;
    if (finalDescription) metadata.twitter.description = finalDescription;
    if (shareImage) metadata.twitter.images = [shareImage];
  }
  return metadata;
}
