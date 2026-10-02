import { permanentRedirect } from "next/navigation";

/**
 * Old post URLs.
 *
 * The posts used to be served here, with no metadata of their own, so every one
 * of them inherited the homepage's title and canonicalised to the homepage -
 * which is the worst possible signal for content that is already written.
 *
 * They now live at /blog/[slug]. This route keeps the old URLs working and
 * issues a 308, so the redirect carries the full link equity and the canonical
 * on the destination always matches the URL that is served.
 */
export default async function OldPostRedirect({ params }) {
  // params is a promise in Next 15+; without the await this redirected to
  // "/blog/undefined".
  const { slug } = await params;
  permanentRedirect(`/blog/${slug}`);
}