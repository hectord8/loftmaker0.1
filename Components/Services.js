"use client";

import Image from "next/image";
import { services } from "@/data/services";
import styles from "../app/(site)/page.module.css";
import useInView from "@/Components/useInView";

export default function Services({ projects = [] }) {
  const { ref, isVisible } = useInView();

  return (
    <section
      ref={ref}
      className={`${styles.sections} ${styles.reveal} ${
        isVisible ? styles.isVisible : ""
      }`}
      id="services"
      aria-labelledby="services-heading"
    >
      <div className={`${styles.sectionimg} ${styles.servicesImage}`}>
        <Image
          src="/random-jobs/IMG_3197.jpeg"
          alt="Loft conversion interior finish"
          sizes="(max-width: 1200px) 90vw, 55vw"
          style={{ objectFit: "cover" }}
          fill
          loading="lazy"
        />
      </div>

      <div className={`${styles.whatwedo} ${styles.servicesCopy}`}>
        <h2 id="services-heading">What We Do</h2>
        <p>
          At Loft Makers London Ltd, we turn unused space into beautiful,
          practical living areas. From first sketches to final finishes, our
          expert team delivers loft conversions, side extensions, GRP flat roof
          installations, and structural steel work across London. With decades
          of construction and project-management experience, we&apos;re fully insured
          and back our craftsmanship with a 10-year structural warranty - so your
          investment is protected.
        </p>
        {projects.length > 0 ? (
          <div className={styles.projectList}>
            <h3 className={styles.projectHeading}>Recent Projects</h3>
            <ul>
              {projects.map((project) => (
                <li key={project._id} className={styles.projectItem}>
                  <h4>{project.title}</h4>
                  {project.summary ? <p>{project.summary}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div
        className={`${styles.stagger} ${isVisible ? styles.isVisible : ""}`}
      >
        <ul>
          {services.map((service, index) => (
            <li
              key={service.title}
              style={{ "--delay": `${index * 80}ms` }}
            >
              <h4>{service.title}</h4>
              <p>{service.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
