import ResponsiveImage from "@/Components/ResponsiveImage";
import styles from "../app/(site)/page.module.css";
import { site } from "@/data/site";
import HeroWordmark from "@/Components/HeroWordmark";

export default function Hero() {
  return (
    <section className={`${styles.mainImage} ${styles.heroReveal}`} data-hero aria-labelledby="hero-heading">
      <ResponsiveImage
        large="/Main_Images/35.jpg"
        medium="/Main_Images/External-surrey.jpg"
        small="/Main_Images/Bathroom-1736X981.jpg"
        alt="Loft conversion and extension completed by Loft Maker London in London"
        priority
        sizes="100vw"
      />
      <HeroWordmark />
      <div className={styles.heroOverlay}>
        <p className={`${styles.heroEyebrow} ${styles.heroItem}`}>Reliable construction services across London and Essex</p>
        {/*
          The only H1 on the page: what the business does, and where. The brand
          tagline follows as supporting text, and the fixed header wordmark is
          a div rather than a heading.
        */}
        <h1 id="hero-heading" className={styles.heroItem}>
          Loft Conversions &amp; Home Extensions in London and Essex
        </h1>
        <p className={`${styles.heroTagline} ${styles.heroItem}`}>
          Complex problems, innovative solutions.
        </p>
        <p className={`${styles.heroCopy} ${styles.heroItem}`}>
          From start to finish, we make sure your home renovation project delivers what
          you need, with clear pricing and honest timelines.
        </p>
        <div className={`${styles.heroActions} ${styles.heroItem}`}>
          <a className="siteButton siteButtonPrimary" href="#contact">
            Get in touch for a free consultation
          </a>
          <a
            className="siteButton siteButtonSecondary"
            href={site.telHref}
            data-call-placement="hero"
          >
            Call {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
