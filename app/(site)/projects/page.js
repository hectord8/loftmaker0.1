import Breadcrumbs from "@/Components/Seo/Breadcrumbs";
import CtaBand from "@/Components/Seo/CtaBand";
import PageHeader from "@/Components/Seo/PageHeader";
import ProjectCard from "@/Components/ProjectCard/ProjectCard";
import JsonLd from "@/Components/Seo/JsonLd";
import { itemListSchema } from "@/lib/jsonld";
import { safeFetch } from "@/sanity/lib/safe-fetch";
import { projectsQuery } from "@/sanity/lib/queries";
import { buildPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = buildPageMetadata({
  title: "Projects",
  description:
    "Completed loft conversions, dormers, mansard roofs, extensions and structural steelwork by Loft Maker London across London and Essex.",
  path: "/projects",
});

export const revalidate = 300;

/**
 * Project index.
 *
 * There are no project documents in Sanity yet, so this renders an honest empty
 * state rather than placeholder projects. Adding documents to the Project type
 * makes them appear here and at /projects/[slug] with no code change.
 */
export default async function ProjectsPage() {
  const projects = (await safeFetch(projectsQuery)) || [];

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ]}
      />

      <PageHeader
        eyebrow="Our work"
        h1="Projects"
        lede="Completed work across London and Essex, photographed on site."
      />

      {projects.length === 0 ? (
        <div className={styles.prose}>
          <p>
            We are publishing our project write-ups now. In the meantime, the{" "}
            <a href="/gallery">gallery</a> shows completed work, and if you would
            like to talk about a project of your own, get in touch and we will come
            and look at it.
          </p>
        </div>
      ) : (
        <>
          <JsonLd
            data={itemListSchema({
              name: "Projects",
              path: "/projects",
              items: projects.map((project) => ({
                name: project.title,
                path: `/projects/${project.slug}`,
              })),
            })}
          />
          <div className={styles.grid}>
            {projects.map((project, index) => (
              <ProjectCard key={project._id} project={project} priority={index < 3} />
            ))}
          </div>
        </>
      )}

      <CtaBand />
    </>
  );
}