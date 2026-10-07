import { sanityClient } from "@/sanity/lib/client";
import TimelineClient from "./TimelineClient";

const postsQuery = `*[_type in ["post", "posts", "content"]] | order(_createdAt desc)[0...8]{
  _id,
  title,
  _createdAt,
  "summary": coalesce(summary, excerpt, description, pt::text(body)),
  "slug": coalesce(slug.current, slug),
  "image": coalesce(coverImage, mainImage, image)
}`;

export default async function LatestPosts() {
  const posts = await sanityClient.fetch(postsQuery);
  if (!posts || posts.length === 0) return null;
  return <TimelineClient posts={posts} />;
}
