/* Queries shared by more than one page. */

/**
 * Image fields.
 *
 * `image` is the full reference (needed by urlFor), `url` is the resolved asset
 * URL and `metadata` carries the intrinsic dimensions, so an image can be given
 * explicit width and height rather than being laid out blind.
 */
const IMAGE_FIELDS = `
  // _key has to be selected explicitly: it is the React key for every rendered
  // <figure>/<li>, and without it the list keys are all undefined. It was
  // missing here, which silently turned "is this the first image?" checks into
  // "is undefined equal to undefined?" - true for all 50 gallery photos, so the
  // whole gallery rendered eager and the page shipped 2 MB.
  "_key": _key,
  "image": image,
  "url": image.asset->url,
  "metadata": image.asset->metadata.dimensions,
  altText,
  caption
`;

/** Homepage + projects grid. Featured across every gallery, not just the first. */
export const featuredImagesQuery = `
  *[_type == "gallery"]{
    title,
    location,
    "images": images[featured == true]{
      ${IMAGE_FIELDS},
      location
    }
  }
`;

/** Full gallery, with the new location and alt text fields. */
export const galleryQuery = `
  *[_type == "gallery"] | order(title asc){
    title,
    location,
    projectSlug,
    "images": images[]{
      ${IMAGE_FIELDS},
      location,
      buildType
    }
  }
`;

/** Project case studies. Empty until documents exist in Studio. */
export const projectsQuery = `
  *[_type == "project" && defined(slug.current)] | order(_createdAt desc){
    _id,
    title,
    "slug": slug.current,
    location,
    buildType,
    duration,
    summary,
    publishedAt,
    "coverImage": coverImage{
      ${IMAGE_FIELDS}
    }
  }
`;

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    location,
    buildType,
    duration,
    summary,
    description,
    publishedAt,
    services,
    "coverImage": coverImage{
      ${IMAGE_FIELDS}
    },
    "beforeImages": beforeImages[]{
      ${IMAGE_FIELDS},
      stage
    },
    "afterImages": afterImages[]{
      ${IMAGE_FIELDS},
      stage
    }
  }
`;

export const projectSlugsQuery = `
  *[_type == "project" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
`;

export const reviewsQuery = `
  *[_type == "review" && published == true] | order(order asc, _createdAt desc){
    _id,
    name,
    area,
    projectType,
    rating,
    text,
    date
  }
`;

export const accreditationsQuery = `
  *[_type == "accreditation" && published == true] | order(order asc){
    _id,
    name,
    issuer,
    logo,
    url,
    "altText": logoAlt
  }
`;

/** Company facts. Emitted only for fields the owner has actually filled in. */
export const companySettingsQuery = `
  *[_type == "companySettings"][0]{
    legalName,
    companyNumber,
    vatNumber,
    foundedYear,
    team,
    insuranceProvider,
    insuranceLevel,
    warrantyProvider,
    warrantyYears,
    "teamImage": teamImage{
      ${IMAGE_FIELDS}
    }
  }
`;

export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc, _createdAt desc){
    _id,
    title,
    publishedAt,
    "slug": coalesce(slug.current, slug),
    "summary": coalesce(summary, pt::text(body))
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && (slug.current == $slug || slug == $slug)][0]{
    ...,
    "slug": coalesce(slug.current, slug),
    // Falls back to the opening of the article so a post without a summary
    // field still gets its own description rather than the site-wide one.
    "summary": coalesce(summary, excerpt, description, pt::text(body)),
    "image": coalesce(coverImage, mainImage, image)
  }
`;

/** Newest posts for the "latest updates" timeline. */
export const latestPostsQuery = `
  *[_type == "post"] | order(_createdAt desc)[0...8]{
    _id,
    title,
    _createdAt,
    "summary": coalesce(summary, excerpt, description, pt::text(body)),
    "slug": coalesce(slug.current, slug),
    "image": coalesce(coverImage, mainImage, image),
    "metadata": image.asset->metadata.dimensions
  }
`;
