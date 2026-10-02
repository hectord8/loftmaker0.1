import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

import Breadcrumbs from "@/Components/Seo/Breadcrumbs";
import CtaBand from "@/Components/Seo/CtaBand";
import JsonLd from "@/Components/Seo/JsonLd";
import { projectSchema } from "@/lib/jsonld";
import { buildPageMetadata } from "@/lib/seo";
import { imageUrl } from "@/sanity/lib/image";
import { safeFetch } from "@/sanity/lib/safe-fetch";
import { projectBySlugQuery, projectSlugsQuery } from "@/sanity/lib/queries";
import styles from "./page.module.css";

export const revalidate = 300;

export async function generateStaticParams() {
  const projects = (await safeFetch(projectSlugsQuery)) || [];
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await safeFetch(projectBySlugQuery, { slug });

  if (!project) {
    return buildPageMetadata({ title: "Project not found", path: `/projects/${slug}`, noindex: true });
  }

  return buildPageMetadata({
    // Editors can override the title per project; otherwise the project title.
    title: project.seoTitle || `${project.title} | ${project.buildType || "Construction project"}`,
    description: project.metaDescription || project.summary,
    path: `/projects/${slug}`,
    image: project.coverImage ? imageUrl(project.coverImage, { width: 1200, height: 630 }) : undefined,
    imageAlt: project.coverImage?.altText,
    type: "article",
    publishedTime: project.publishedAt,
    noindex: project.noindex,
  });
}

/**
 * A single case study. Only reachable for projects that actually exist in
 * Sanity - there is no demo or template project, so nothing on this page can be
 * mistaken for real client work.
 */
export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await safeFetch(projectBySlugQuery, { slug });

  if (!project) notFound();

  const facts = [
    ["Location", project.location],
    ["Build type", project.buildType],
    ["Duration on site", project.duration],
    ["Services", Array.isArray(project.services) ? project.services.join(", ") : null],
  ].filter(([, value]) => Boolean(value));

  return (
    <>
      <JsonLd
        data={projectSchema({
          title: project.title,
          description: project.summary,
          path: `/projects/${slug}`,
          location: project.location,
          services: Array.isArray(project.services) ? project.services : [],
          image: project.coverImage ? imageUrl(project.coverImage, { width: 1200, height: 630 }) : null,
          imageAlt: project.coverImage?.altText,
          datePublished: project.publishedAt,
        })}
      />

      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${slug}` },
        ]}
      />

      <article className={styles.page}>
        <header className={styles.header}>
          <h1>{project.title}</h1>
          {project.summary ? <p className={styles.summary}>{project.summary}</p> : null}
        </header>

        {project.coverImage?.url ? (
          <Image
            className={styles.cover}
            src={imageUrl(project.coverImage, { width: 1400 })}
            alt={project.coverImage.altText || ""}
            width={project.coverImage.metadata?.width || 1400}
            height={project.coverImage.metadata?.height || 900}
            sizes="(max-width: 1200px) 92vw, 1100px"
            priority
          />
        ) : null}

        {facts.length ? (
          <dl className={styles.facts}>
            {facts.map(([label, value]) => (
              <div key={label} className={styles.fact}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {Array.isArray(project.description) && project.description.length ? (
          <div className={styles.body}>
            <PortableText
              value={project.description}
              components={{
                types: {
                  image: ({ value }) => (
                    <Image
                      src={imageUrl(value, { width: 1400 })}
                      alt={value.alt || ""}
                      width={value.asset?.metadata?.dimensions?.width || 1400}
                      height={value.asset?.metadata?.dimensions?.height || 900}
                      sizes="(max-width: 1200px) 92vw, 1100px"
                    />
                  ),
                },
              }}
            />
          </div>
        ) : null}

        {[project.beforeImages, project.afterImages]
          .filter((images) => images?.length)
          .map((images) => (
            <ul key={images[0]._key} className={styles.gallery}>
              {images.map((item) => (
                <li key={item._key}>
                  <Image
                    src={imageUrl(item, { width: 1000 })}
                    alt={item.altText || ""}
                    width={item.metadata?.width || 1000}
                    height={item.metadata?.height || 750}
                    sizes="(max-width: 700px) 92vw, 45vw"
                  />
                  {item.caption ? <p className={styles.caption}>{item.caption}</p> : null}
                </li>
              ))}
            </ul>
          ))}
      </article>

      <CtaBand />
    </>
  );
}