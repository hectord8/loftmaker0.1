"use client";

import styles from "../app/(site)/page.module.css";
import useInView from "@/Components/useInView";

export default function Intro() {
  const { ref, isVisible } = useInView();

  return (
    <section
      ref={ref}
      className={`${styles.intro} ${styles.stagger} ${
        isVisible ? styles.isVisible : ""
      }`}
      aria-labelledby="intro-heading"
    >
      <h2 id="intro-heading" style={{ "--delay": "0ms" }}>
        Complex Problems, innovative solutions
      </h2>
      <p style={{ "--delay": "120ms" }}>
        From start to finish, we make sure your home renovation London project
        delivers what you need. We do loft conversions, extensions, and full
        home renovations across London and Essex — from Chingford to South
        Woodford. Every job gets the same straightforward approach: clear
        pricing, honest timelines, and work we&apos;re happy to stand behind.
        Whether it&apos;s a simple conversion or something more involved, we&apos;ll
        talk through your options and find what works for your home and your
        budget.
      </p>
      <h3 style={{ "--delay": "220ms" }}>
        Get in touch for a free, no-obligation consultation.
      </h3>
    </section>
  );
}
