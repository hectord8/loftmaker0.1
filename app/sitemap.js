import { site } from "@/data/site";
import { allServices } from "@/content/services";
import { areas } from "@/content/areas";
import { safeFetch } from "@/sanity/lib/safe-fetch";
import { postsQuery, projectSlugsQuery } from "@/sanity/lib/queries";

/**
 * XML sitemap, built from the same registries the pages are generated from.
 *
 * This previously contained only the homepage, so every service, project and
 * post was effectively invisible to search engines. Services and areas come from
 * the content registry; projects and posts are read from Sanity so a new
 * document is indexed without a code change. If Sanity is unreachable the CMS
 * entries are simply omitted - the sitemap must still build.
 */
const LASTMOD = new Date();

const entry = (path, { priority, changeFrequency = "monthly", lastModified = LASTMOD } = {}) => ({
  url: `${site.url}${path === "/" ? "/" : path}`,
  lastModified,
  changeFrequency,
  priority,
});

export default async function sitemap() {
  const staticPages = [
    entry("/", { priority: 1, changeFrequency: "weekly" }),
    entry("/services", { priority: 0.9 }),
    entry("/projects", { priority: 0.7 }),
    entry("/gallery", { priority: 0.7, changeFrequency: "weekly" }),
    entry("/about", { priority: 0.6 }),
    entry("/contact", { priority: 0.9 }),
    entry("/areas", { priority: 0.6 }),
    entry("/blog", { priority: 0.6, changeFrequency: "weekly" }),
  ];

  const servicePages = allServices.map((service) =>
    entry(service.href, { priority: service.parent ? 0.8 : 0.9 }),
  );

  // Empty until area pages are published; /areas is still listed above.
  const areaPages = areas.map((area) => entry(area.href, { priority: 0.7 }));

  const [projectSlugs, posts] = await Promise.all([
    safeFetch(projectSlugsQuery),
    safeFetch(postsQuery),
  ]);

  const projectPages = (projectSlugs || []).map((project) =>
    entry(`/projects/${project.slug}`, {
      priority: 0.6,
      lastModified: project._updatedAt ? new Date(project._updatedAt) : LASTMOD,
    }),
  );

  const postPages = (posts || []).map((post) =>
    entry(`/blog/${post.slug}`, {
      priority: 0.5,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : LASTMOD,
      changeFrequency: "yearly",
    }),
  );

  return [...staticPages, ...servicePages, ...areaPages, ...projectPages, ...postPages];
}