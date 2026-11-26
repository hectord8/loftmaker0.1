import styles from "./page.module.css";
import Hero from "@/Components/Hero";
import TrustStrip from "@/Components/TrustStrip/TrustStrip";
import PreviousProjectsSection from "@/Components/PreviousProjectsSection";
import Services from "@/Components/Services";
import GalleryPreview from "@/Components/GalleryPreview";
import ContactForm from "@/Components/ContactForm/ContactForm";
import AnimatedSection from "@/Components/AnimatedSection";
import { getFeaturedProjects, getHomePage, getSiteSettings, imageUrl } from "@/sanity/lib/content";
import { pageMetadata } from "@/sanity/lib/metadata";

export const revalidate = 60;

export async function generateMetadata() {
  const home = await getHomePage();
  return pageMetadata(home.seo, { path: "/" });
}

export default async function Home() {
  const [settings, home, projects] = await Promise.all([
    getSiteSettings(),
    getHomePage(),
    getFeaturedProjects(),
  ]);

  const projectImages = home.projectImages.map((image) => ({
    url: imageUrl(image, 900),
    alt: image.alt,
  }));

  return (
    <div className={styles.page}>
      <Hero content={home} settings={settings} />
      <TrustStrip points={home.trustPoints} />
      <section className={styles.intro} aria-labelledby="intro-heading">
        <h2 id="intro-heading">{home.introHeading}</h2>
        <p>{home.introText}</p>
        {home.introSubheading ? <h3>{home.introSubheading}</h3> : null}
        <a className={`${styles.introAction} siteButton siteButtonPrimary`} href="#contact">{home.introButtonLabel}</a>
      </section>
      <PreviousProjectsSection heading={home.projectsHeading} images={projectImages} />
      <Services
        heading={home.servicesHeading}
        text={home.servicesText}
        services={home.services}
        projects={projects}
      />
      <GalleryPreview heading={home.galleryHeading} />
      <AnimatedSection className={styles.contactSection} id="contact" aria-labelledby="contact-heading">
        <div>
          {home.contactEyebrow ? <p className={styles.contactEyebrow}>{home.contactEyebrow}</p> : null}
          <h2 id="contact-heading">{home.contactHeading}</h2>
          {home.contactText ? <p>{home.contactText}</p> : null}
        </div>
        <ContactForm phone={settings.phone} />
      </AnimatedSection>
    </div>
  );
}
