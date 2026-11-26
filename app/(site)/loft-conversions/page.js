import {
  CaseStudies,
  Faqs,
  JsonLd,
  LoftContact,
  LoftHero,
  PageCards,
  ProcessSteps,
  RichBody,
  faqJsonLd,
} from "@/Components/Loft/LoftSections";
import PageSections from "@/Components/Loft/PageSections";
import styles from "@/Components/Loft/loft.module.css";
import { getLoftHub, getLoftPages, getSiteSettings } from "@/sanity/lib/content";
import { pageMetadata } from "@/sanity/lib/metadata";
import { defaultLoftHub } from "@/data/content";

export const revalidate = 60;

export async function generateMetadata() {
  const hub = await getLoftHub();
  return pageMetadata(hub.seo, {
    path: "/loft-conversions",
    title: "Loft Conversions in London & Essex",
    description: hub.intro,
  });
}

export default async function LoftConversionsPage() {
  const [hub, pages, settings] = await Promise.all([getLoftHub(), getLoftPages(), getSiteSettings()]);
  const types = pages.filter((page) => page.pageType === "type");
  const areas = pages.filter((page) => page.pageType === "area");
  const projects = pages.flatMap((page) => page.projects || []);
  const uniqueProjects = [...new Map(projects.map((p) => [p._id, p])).values()].slice(0, 6);

  return (
    <div className={styles.page}>
      <JsonLd data={faqJsonLd(hub.faqs)} />
      <LoftHero
        eyebrow={hub.eyebrow}
        heading={hub.heading}
        intro={hub.intro}
        image={hub.heroImage}
        phone={settings.phone}
        phoneE164={settings.phoneE164}
        buttonLabel={hub.cta?.buttonLabel}
      />
      <PageCards heading={hub.typesHeading} pages={types} />
      <RichBody value={hub.body} />
      <ProcessSteps heading={hub.processHeading} steps={hub.processSteps} />
      <PageSections sections={hub.sections} />
      <CaseStudies projects={uniqueProjects} />
      <PageCards heading={hub.areasHeading} pages={areas} />
      <Faqs faqs={hub.faqs} />
      <LoftContact cta={hub.cta} fallback={defaultLoftHub.cta} phone={settings.phone} />
    </div>
  );
}
