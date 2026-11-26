import { PortableText } from "@portabletext/react";

import { imageUrl } from "@/sanity/lib/content";
import styles from "./sections.module.css";

const hasText = (blocks) =>
  Array.isArray(blocks) && blocks.some((b) => b.children?.some((c) => c.text?.trim()));

function Photo({ image, width, height, className, sizesAlt }) {
  const src = imageUrl(image, width, height);
  if (!src) return null;
  return <img className={className} src={src} alt={image.alt || sizesAlt || ""} loading="lazy" />;
}

function TextImage({ eyebrow, heading, text, image, imagePosition }) {
  const hasImage = Boolean(image?.asset);
  return (
    <section
      className={`${styles.textImage} ${hasImage ? "" : styles.textOnly} ${
        imagePosition === "left" ? styles.imageLeft : ""
      }`}
    >
      <div className={styles.copy}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        {heading ? <h2>{heading}</h2> : null}
        {hasText(text) ? (
          <div className={styles.prose}>
            <PortableText value={text} />
          </div>
        ) : null}
      </div>
      {hasImage ? (
        <div className={styles.media}>
          <Photo image={image} width={1200} height={900} sizesAlt={heading} />
        </div>
      ) : null}
    </section>
  );
}

function Features({ heading, intro, items = [] }) {
  if (!items?.length) return null;
  return (
    <section className={styles.block}>
      {heading ? <h2>{heading}</h2> : null}
      {intro ? <p className={styles.intro}>{intro}</p> : null}
      <div className={styles.features}>
        {items.map((item) => (
          <article key={item._key || item.title} className={styles.feature}>
            <Photo image={item.image} width={800} height={500} className={styles.featureImage} sizesAlt={item.title} />
            <h3>{item.title}</h3>
            {item.text ? <p>{item.text}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function KeyFacts({ heading, facts = [] }) {
  const list = (facts || []).filter((f) => f.value);
  if (!list.length) return null;
  return (
    <section className={styles.block}>
      {heading ? <h2 className="visuallyHidden">{heading}</h2> : null}
      <dl className={styles.facts}>
        {list.map((fact) => (
          <div key={fact._key || fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Gallery({ heading, intro, images = [] }) {
  const list = (images || []).filter((img) => img?.asset);
  if (!list.length) return null;
  return (
    <section className={styles.block}>
      {heading ? <h2>{heading}</h2> : null}
      {intro ? <p className={styles.intro}>{intro}</p> : null}
      <div className={styles.gallery}>
        {list.map((img, i) => (
          <figure key={img._key || i} className={i % 5 === 0 ? styles.galleryWide : ""}>
            <Photo image={img} width={i % 5 === 0 ? 1400 : 800} height={i % 5 === 0 ? 800 : 600} sizesAlt={img.caption || heading} />
            {img.caption ? <figcaption>{img.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
    </section>
  );
}

function BeforeAfter({ heading, intro, pairs = [] }) {
  const list = (pairs || []).filter((p) => p.before?.asset && p.after?.asset);
  if (!list.length) return null;
  return (
    <section className={styles.block}>
      {heading ? <h2>{heading}</h2> : null}
      {intro ? <p className={styles.intro}>{intro}</p> : null}
      <div className={styles.pairs}>
        {list.map((pair) => (
          <figure key={pair._key} className={styles.pair}>
            <div className={styles.pairImages}>
              <div>
                <Photo image={pair.before} width={900} height={700} sizesAlt="Before" />
                <span className={styles.badge}>Before</span>
              </div>
              <div>
                <Photo image={pair.after} width={900} height={700} sizesAlt="After" />
                <span className={styles.badge}>After</span>
              </div>
            </div>
            {pair.caption ? <figcaption>{pair.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
    </section>
  );
}

function Quote({ quote, name, location, image }) {
  if (!quote?.trim()) return null;
  return (
    <section className={`${styles.block} ${styles.quote} ${image?.asset ? styles.quoteWithImage : ""}`}>
      <Photo image={image} width={600} height={600} className={styles.quoteImage} sizesAlt={name} />
      <blockquote>
        <p>“{quote}”</p>
        {name || location ? (
          <footer>
            {name ? <strong>{name}</strong> : null}
            {location ? <span>{location}</span> : null}
          </footer>
        ) : null}
      </blockquote>
    </section>
  );
}

function CtaBanner({ heading, text, buttonLabel, image }) {
  if (!heading) return null;
  const src = imageUrl(image, 2000, 900);
  return (
    <section className={`${styles.banner} ${src ? styles.bannerWithImage : ""}`}>
      {src ? <img className={styles.bannerImage} src={src} alt="" loading="lazy" /> : null}
      <div className={styles.bannerInner}>
        <h2>{heading}</h2>
        {text ? <p>{text}</p> : null}
        <a className="siteButton siteButtonPrimary" href="#contact">{buttonLabel || "Book a free consultation"}</a>
      </div>
    </section>
  );
}

const components = {
  sectionTextImage: TextImage,
  sectionFeatures: Features,
  sectionKeyFacts: KeyFacts,
  sectionGallery: Gallery,
  sectionBeforeAfter: BeforeAfter,
  sectionQuote: Quote,
  sectionCtaBanner: CtaBanner,
};

export default function PageSections({ sections = [] }) {
  if (!sections?.length) return null;
  return sections.map((section, i) => {
    const Component = components[section._type];
    return Component ? <Component key={section._key || i} {...section} /> : null;
  });
}
