import styles from "./page.module.css";
import Hero from "@/Components/Hero";
import PreviousProjectsSection from "@/Components/PreviousProjectsSection";
import Services from "@/Components/Services";
import GalleryPreview from "@/Components/GalleryPreview";
import ContactForm from "@/Components/ContactForm/ContactForm";
import AnimatedSection from "@/Components/AnimatedSection";
// import LatestPosts from "@/Components/LatestPosts/LatestPosts";

export default async function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <section className={styles.intro} aria-labelledby="intro-heading">
        <h2 id="intro-heading">Complex Problems, innovative solutions</h2>
        <p>
          From start to finish, we make sure your home renovation London project
          delivers what you need. We do loft conversions, extensions, and full
          home renovations across London and Essex — from Chingford to South
          Woodford. Every job gets the same straightforward approach: clear
          pricing, honest timelines, and work we&apos;re happy to stand behind.
          Whether it&apos;s a simple conversion or something more involved, we&apos;ll
          talk through your options and find what works for your home and your
          budget.
        </p>
        <h3>Get in touch for a free, no-obligation consultation.</h3>
        <a className={`${styles.introAction} siteButton siteButtonPrimary`} href="#contact">Tell us about your project</a>
      </section>
      <PreviousProjectsSection />
      <Services />
      <GalleryPreview />
      <AnimatedSection className={styles.contactSection} id="contact" aria-labelledby="contact-heading">
        <div>
          <p className={styles.contactEyebrow}>Get in touch</p>
          <h2 id="contact-heading">Get in touch for a free, no-obligation consultation.</h2>
          <p>Tell us about your home renovation project and we&apos;ll talk through your options to find what works for your home and your budget.</p>
        </div>
        <ContactForm />
      </AnimatedSection>
      {/* <LatestPosts /> */}
    </div>
  );
}
