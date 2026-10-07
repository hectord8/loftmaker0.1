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
        alt="Loft conversion project exterior"
        priority
        sizes="100vw"
      />
      <HeroWordmark />
      <div className={styles.heroOverlay}>
        <p className={`${styles.heroEyebrow} ${styles.heroItem}`}>Reliable construction services across London and Essex</p>
        <h1 id="hero-heading" className={styles.heroItem}>Complex problems, innovative solutions.</h1>
        <p className={`${styles.heroCopy} ${styles.heroItem}`}>From start to finish, we make sure your home renovation project delivers what you need, with clear pricing and honest timelines.</p>
        <div className={`${styles.heroActions} ${styles.heroItem}`}>
          <a className={`${styles.primaryAction} siteButton siteButtonPrimary`} href="#contact">Get in touch for a free consultation</a>
          <a className={`${styles.secondaryAction} siteButton siteButtonSecondary`} href={`tel:+44${site.phone.slice(1)}`}>Call {site.phone}</a>
        </div>
      </div>
    </section>
  );
}
