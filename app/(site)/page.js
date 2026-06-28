import styles from "./page.module.css";
import Hero from "@/Components/Hero";
import PreviousProjectsSection from "@/Components/PreviousProjectsSection";
import Services from "@/Components/Services";
import GalleryPreview from "@/Components/GalleryPreview";
import LatestPosts from "@/Components/LatestPosts/LatestPosts";

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
      </section>
      <PreviousProjectsSection />
      <Services />
      <GalleryPreview />
      <LatestPosts />
    </div>
  );
}
