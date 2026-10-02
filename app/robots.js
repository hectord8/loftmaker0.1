import { site } from "@/data/site";

/**
 * robots.txt
 *
 * /studio is the Sanity CMS. It is not useful to search engines and it can be
 * left open (a client-side app that needs an indexable page to boot), so it is
 * disallowed rather than blocked. /api holds the contact endpoint, and
 * disallowing it keeps query URLs out of the index.
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}