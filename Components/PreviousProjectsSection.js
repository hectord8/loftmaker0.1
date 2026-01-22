"use client";

import PreviousProject from "@/Components/PreviousProject/PreviousProject";
import styles from "../app/(site)/page.module.css";
import useInView from "@/Components/useInView";

export default function PreviousProjectsSection() {
  const { ref, isVisible } = useInView();

  return (
    <section
      ref={ref}
      className={`${styles.PreviousProject} ${styles.reveal} ${
        isVisible ? styles.isVisible : ""
      }`}
      aria-labelledby="previous-projects-heading"
    >
      <h2 id="previous-projects-heading">Previous Project</h2>
      <PreviousProject />
    </section>
  );
}
