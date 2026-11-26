"use client";

import PreviousProject from "@/Components/PreviousProject/PreviousProject";
import styles from "../app/(site)/page.module.css";
import useInView from "@/Components/useInView";

export default function PreviousProjectsSection({ heading, images }) {
  const { ref, isVisible } = useInView();

  return (
    <section
      ref={ref}
      className={`${styles.PreviousProject} ${styles.reveal} ${isVisible ? styles.isVisible : ""}`}
      id="projects"
      aria-labelledby="previous-projects-heading"
    >
      <h2 id="previous-projects-heading">{heading}</h2>
      <PreviousProject images={images} />
    </section>
  );
}
