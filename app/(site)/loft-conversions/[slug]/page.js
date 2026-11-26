import Link from "next/link";
import { notFound } from "next/navigation";

import {
  CaseStudies,
  Faqs,
  Highlights,
  JsonLd,
  LoftContact,
  LoftHero,
  PageCards,
  RichBody,
  faqJsonLd,
} from "@/Components/Loft/LoftSections";
import PageSections from "@/Components/Loft/PageSections";
import styles from "@/Components/Loft/loft.module.css";
import { getLoftPage, getLoftPages, getSiteSettings } from "@/sanity/lib/content";
import { pageMetadata } from "@/sanity/lib/metadata";
import { defaultLoftHub } from "@/data/content";
import { site } from "@/data/site";

export const revalidate = 60;

export async function generateStaticParams() {
  const pages = await getLoftPages();
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getLoftPage(slug);
  if (!page) return { title: "Page not found", robots: { index: false } };
  return pageMetadata(page.seo, {
    path: `/loft-conversions/${page.slug}`,
    title: page.title,
    description: page.summary,
  });
}

export default async function LoftPage({ params }) {
  const { slug } = await params;
  const [page, pages, settings] = await Promise.all([
    getLoftPage(slug),
    getLoftPages(),
    getSiteSettings(),
  ]);
  if (!page) notFound();

  const related = pages.filter((p) => p.pageType === page.pageType && p.slug !== page.slug);
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "Loft conversions", item: `${site.url}/loft-conversions` },
      { "@type": "ListItem", position: 3, name: page.title, item: `${site.url}/loft-conversions/${page.slug}` },
    ],
  };

  return (
    <div className={styles.page}>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={faqJsonLd(page.faqs)} />
      <LoftHero
        eyebrow={page.eyebrow}
        heading={page.heading || page.title}
        intro={page.summary}
        image={page.heroImage}
        phone={settings.phone}
        phoneE164={settings.phoneE164}
        buttonLabel={page.cta?.buttonLabel}
        breadcrumb={
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/loft-conversions">Loft conversions</Link> / {page.title}
          </nav>
        }
      />
      {page.sections?.some((section) => section._type === "sectionKeyFacts") ? null : <Highlights items={page.highlights} />}
      <RichBody value={page.body} />
      <PageSections sections={page.sections} />
      <CaseStudies projects={page.projects} />
      <Faqs faqs={page.faqs} />
      <PageCards heading={page.pageType === "area" ? "Other areas we cover" : "Other loft conversions"} pages={related} />
      <LoftContact cta={page.cta} fallback={defaultLoftHub.cta} phone={settings.phone} />
    </div>
  );
}
