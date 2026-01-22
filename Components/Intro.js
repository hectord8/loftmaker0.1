"use client";

import styles from "../app/page.module.css";
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
        From start to finish, we ensure that your loft conversion in the London
        area meets your desired requirements. With a focus on exceptional
        service and a high-quality finish, we take pride in our workmanship. We
        offer a range of loft conversion options to suit any lifestyle and
        budget, recognizing that every home is unique. Whether you&apos;re looking
        for a simple conversion or a more complex project, our skilled team can
        bring your ideas to life. Our commitment to quality and customization
        guarantees a loft conversion or extension that is truly personalized
        for you.
      </p>
      <h3 style={{ "--delay": "220ms" }}>
        Contact us today to schedule a free initial consultation.
      </h3>
    </section>
  );
}
