import { site } from "@/data/site";
import { sanityClient } from "@/sanity/lib/client";
import { getLoftPages } from "@/sanity/lib/content";

const postsQuery = `*[_type in ["post", "posts", "content"] && defined(coalesce(slug.current, slug))]{
  "slug": coalesce(slug.current, slug),
  _updatedAt
}`;

export const revalidate = 3600;

export default async function sitemap() {
  const pages = [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/loft-conversions`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/gallery`, changeFrequency: "monthly", priority: 0.7 },
  ];
  const loftPages = (await getLoftPages()).map((page) => ({
    url: `${site.url}/loft-conversions/${page.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  let posts = [];
  try {
    posts = await sanityClient.fetch(postsQuery);
  } catch {
    // If Sanity is unreachable, still serve the static pages.
  }

  return [
    ...pages,
    ...loftPages,
    ...posts.map((post) => ({
      url: `${site.url}/posts/${post.slug.replace(/^\/+/, "")}`,
      lastModified: post._updatedAt ? new Date(post._updatedAt) : undefined,
      changeFrequency: "yearly",
      priority: 0.5,
    })),
  ];
}
