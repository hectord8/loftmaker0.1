import Link from "next/link";
import { PortableText } from "@portabletext/react";

import ContactForm from "@/Components/ContactForm/ContactForm";
import { imageUrl } from "@/sanity/lib/content";
import styles from "./loft.module.css";

const richTextComponents = {
  types: {
    image: ({ value }) =>
      value?.asset ? (
        <img className={styles.bodyImage} src={imageUrl(value, 1400)} alt={value.alt || ""} loading="lazy" />
      ) : null,
  },
};

export function LoftHero({ eyebrow, heading, intro, image, phone, phoneE164, buttonLabel, breadcrumb }) {
  const src = imageUrl(image, 2000);
  return (
    <section
      className={`${styles.hero} ${src ? styles.heroWithImage : ""}`}
      aria-labelledby="loft-heading"
      {...(src ? { "data-hero": "" } : {})}
    >
      {src ? <img className={styles.heroImage} src={src} alt="" fetchPriority="high" /> : null}
      <div className={styles.heroInner}>
        {breadcrumb}
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h1 id="loft-heading">{heading}</h1>
        {intro ? <p className={styles.heroText}>{intro}</p> : null}
        <div className={styles.actions}>
          <a className="siteButton siteButtonPrimary" href="#contact">{buttonLabel || "Book a free consultation"}</a>
          {phone ? (
            <a className={`siteButton ${src ? "siteButtonSecondary" : "siteButtonSecondaryDark"}`} href={`tel:${phoneE164}`}>
              Call {phone}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function Highlights({ items = [] }) {
  if (!items?.length) return null;
  return (
    <ul className={styles.highlights}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function RichBody({ value }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return (
    <div className={styles.body}>
      <PortableText value={value} components={richTextComponents} />
    </div>
  );
}

export function PageCards({ heading, pages = [] }) {
  if (!pages.length) return null;
  return (
    <section className={styles.section}>
      {heading ? <h2>{heading}</h2> : null}
      <div className={styles.cards}>
        {pages.map((page) => {
          const src = imageUrl(page.heroImage, 800, 500);
          return (
            <Link key={page.slug} href={`/loft-conversions/${page.slug}`} className={styles.card}>
              {src ? <img src={src} alt="" loading="lazy" /> : null}
              <h3>{page.title}</h3>
              {page.summary ? <p>{page.summary}</p> : null}
              <span className={styles.cardLink}>Find out more →</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function ProcessSteps({ heading, steps = [] }) {
  if (!steps?.length) return null;
  return (
    <section className={styles.section}>
      {heading ? <h2>{heading}</h2> : null}
      <ol className={styles.steps}>
        {steps.map((step, i) => (
          <li key={step._key || step.title}>
            <span className={styles.stepNumber}>{i + 1}</span>
            <h3>{step.title}</h3>
            {step.text ? <p>{step.text}</p> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CaseStudies({ projects = [] }) {
  if (!projects?.length) return null;
  return (
    <section className={styles.section}>
      <h2>Recent projects</h2>
      <div className={styles.cards}>
        {projects.map((project) => {
          const src = imageUrl(project.coverImage, 800, 500);
          const meta = [project.loftType, project.area, project.duration].filter(Boolean).join(" · ");
          return (
            <article key={project._id} className={styles.card}>
              {src ? <img src={src} alt={project.title} loading="lazy" /> : null}
              <h3>{project.title}</h3>
              {meta ? <p className={styles.meta}>{meta}</p> : null}
              {project.summary ? <p>{project.summary}</p> : null}
              {project.testimonial ? (
                <blockquote className={styles.quote}>
                  “{project.testimonial}”
                  {project.clientName ? <cite>— {project.clientName}</cite> : null}
                </blockquote>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function Faqs({ faqs = [] }) {
  if (!faqs?.length) return null;
  return (
    <section className={styles.section}>
      <h2>Frequently asked questions</h2>
      <div className={styles.faqs}>
        {faqs.map((faq) => (
          <details key={faq._key || faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function faqJsonLd(faqs = []) {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function JsonLd({ data }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function LoftContact({ cta = {}, fallback, phone }) {
  const content = { ...fallback, ...Object.fromEntries(Object.entries(cta || {}).filter(([, v]) => v)) };
  return (
    <section className={styles.contact} id="contact" aria-labelledby="loft-contact-heading">
      <div>
        <h2 id="loft-contact-heading">{content.heading}</h2>
        {content.text ? <p>{content.text}</p> : null}
      </div>
      <ContactForm phone={phone} />
    </section>
  );
}
