import { safeFetch } from "@/sanity/lib/safe-fetch";
import { latestPostsQuery } from "@/sanity/lib/queries";
import TimelineClient from "./TimelineClient";

/**
 * Latest updates timeline.
 *
 * Kept wired but not rendered on the homepage: it is a "latest updates" feed,
 * which duplicates /blog and adds a second, differently-shaped index for the
 * same content. It is here for the owner to re-enable if wanted.
 */
export default async function LatestPosts() {
  const posts = (await safeFetch(latestPostsQuery)) || [];
  if (posts.length === 0) return null;

  return <TimelineClient posts={posts} />;
}