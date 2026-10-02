import { createImageUrlBuilder } from "@sanity/image-url";

import { sanityClient } from "./client";

const builder = createImageUrlBuilder(sanityClient);

/**
 * Accepts either a bare image value or an object that contains one, so a query
 * that projects an image inside a gallery or project document can be passed
 * straight in without unwrapping it at every call site.
 */
const resolveImage = (source) =>
  source?.image ?? source?.coverImage ?? source?.asset
    ? (source?.image ?? source?.coverImage ?? source)
    : source;

export const urlFor = (source) => builder.image(resolveImage(source));

/**
 * A responsive Sanity URL, for the cases where a plain string is genuinely
 * needed. next/image is used everywhere else.
 */
export const imageUrl = (source, { width = 1200, height, quality = 75 } = {}) => {
  const image = resolveImage(source);
  let sized = builder.image(image).width(width).quality(quality).auto("format");
  if (height) sized = sized.height(height).fit("crop");
  return sized.url();
};

/** Intrinsic dimensions, so an image can reserve its space and avoid CLS. */
export const imageDimensions = (source) => {
  const metadata = source?.metadata ?? resolveImage(source)?.metadata;
  if (!metadata) return { width: 1200, height: 900 };

  const { width, height, aspectRatio } = metadata;
  if (width && height) return { width, height };
  if (width && aspectRatio) return { width, height: Math.round(width / aspectRatio) };
  return { width: 1200, height: 900 };
};