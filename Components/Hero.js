import ResponsiveImage from "@/Components/ResponsiveImage";
import styles from "../app/(site)/page.module.css";
import HeroWordmark from "@/Components/HeroWordmark";
import { imageUrl } from "@/sanity/lib/content";

export default function Hero({ content, settings }) {
  const image = content.heroImage;
  const sources = image
    ? {
        large: imageUrl(image, 2400),
        medium: imageUrl(image, 1400),
        small: imageUrl(image, 900),
      }
    : {
        large: "/Main_Images/35.jpg",
        medium: "/Main_Images/External-surrey.jpg",
        small: "/Main_Images/Bathroom-1736X981.jpg",
      };

  return (
    <section className={`${styles.mainImage} ${styles.heroReveal}`} data-hero aria-labelledby="hero-heading">
      <ResponsiveImage {...sources} alt="Loft conversion project exterior" priority sizes="100vw" />
      <HeroWordmark name={settings.name} />
      <div className={styles.heroOverlay}>
        {content.heroEyebrow ? (
          <p className={`${styles.heroEyebrow} ${styles.heroItem}`}>{content.heroEyebrow}</p>
        ) : null}
        <h1 id="hero-heading" className={styles.heroItem}>{content.heroHeading}</h1>
        {content.heroText ? <p className={`${styles.heroCopy} ${styles.heroItem}`}>{content.heroText}</p> : null}
        <div className={`${styles.heroActions} ${styles.heroItem}`}>
          <a className={`${styles.primaryAction} siteButton siteButtonPrimary`} href="#contact">{content.heroButtonLabel}</a>
          <a className={`${styles.secondaryAction} siteButton siteButtonSecondary`} href={`tel:${settings.phoneE164}`}>Call {settings.phone}</a>
        </div>
      </div>
    </section>
  );
}
