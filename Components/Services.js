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
          At Loft Maker London, we believe every property has untapped potential. Whether it&apos;s a side return, a rear extension, an unused outbuilding,
           or a full structural overhaul, we specialise in bringing spaces to life — creating homes that work harder for the people who live in them.
          From the moment you get in touch, we take care of everything. Our in-house team handles the full journey: design and planning, structural engineering, 
          roofing, steelwork, groundworks, and all the finishing touches that make a house feel like a home. One team, one point of contact, zero hassle.
          Every project we deliver is backed by a 10-year structural warranty — because we build things to last, and we stand behind every job we do. 
          We don't cut corners and we don't settle for anything less than work we're genuinely proud of.
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
