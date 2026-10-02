import styles from "./page.module.css";
import Hero from "@/Components/Hero";
import PreviousProjectsSection from "@/Components/PreviousProjectsSection";
import Services from "@/Components/Services";
import GalleryPreview from "@/Components/GalleryPreview";
import ContactForm from "@/Components/ContactForm/ContactForm";
import AnimatedSection from "@/Components/AnimatedSection";
import CtaBand from "@/Components/Seo/CtaBand";
import FaqSection from "@/Components/Seo/FaqSection";
import JsonLd from "@/Components/Seo/JsonLd";
import { site } from "@/data/site";
import { serviceSchema } from "@/lib/jsonld";
import { generalFaqs } from "@/content/faqs";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  path: "/",
  // Google truncates titles around 600px, so the short form here is combined
  // with the "| Loft Maker London" template from the root layout.
  title: "Loft Conversions & Extensions in London and Essex",
  description:
    "Loft Maker London builds loft conversions, dormers, mansard roofs, side extensions and structural steelwork across London and Essex. Free consultation.",
  // No per-page image override: Main_Images/35.jpg is 4032x2268 and social
  // platforms crop it to 1.91:1. The default /og/... file is exactly 1200x630.
});

export default async function Home() {
  return (
    <div className={styles.page}>
      <JsonLd data={serviceSchema(site)} />

      <Hero />

      <section className={styles.intro} aria-labelledby="intro-heading">
        {/*
          The brand tagline now lives in the hero as supporting text. It used
          to be repeated here as an <h2>, which duplicated the hero copy; this
          heading describes the section instead.
        */}
        <h2 id="intro-heading">Home renovation projects across London and Essex</h2>
        <p>
          From start to finish, we make sure your home renovation project delivers
          what you need. We do loft conversions, extensions, and full home
          renovations across London and Essex &mdash; from Chingford to South Woodford.
          Every job gets the same straightforward approach: clear pricing, honest
          timelines, and work we&apos;re happy to stand behind.
        </p>
        <p>
          Whether it&apos;s a simple conversion or something more involved, we&apos;ll
          talk through your options and find what works for your home and your budget.
        </p>
        <h3>Get in touch for a free, no-obligation consultation.</h3>
        <a className={`${styles.introAction} siteButton siteButtonPrimary`} href="#contact">
          Tell us about your project
        </a>
      </section>

      <PreviousProjectsSection />
      <Services />
      <GalleryPreview />
      <FaqSection faqs={generalFaqs} />

      <AnimatedSection
        className={styles.contactSection}
        id="contact"
        aria-labelledby="contact-heading"
      >
        <div>
          <p className={styles.contactEyebrow}>Get in touch</p>
          <h2 id="contact-heading">Get in touch for a free, no-obligation consultation.</h2>
          <p>
            Tell us about your home renovation project and we&apos;ll talk through
            your options to find what works for your home and your budget.
          </p>
        </div>
        <ContactForm />
      </AnimatedSection>

      <CtaBand />
    </div>
  );
}