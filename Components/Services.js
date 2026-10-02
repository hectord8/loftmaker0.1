"use client";

import Image from "next/image";
import Link from "next/link";

import { topLevelServiceCards } from "@/data/services";
import styles from "../app/(site)/page.module.css";
import useInView from "@/Components/useInView";

/**
 * "What We Do" homepage section.
 *
 * Kept the original layout - image, intro copy, staggered service list - and
 * fixed three things:
 *   - the service list used <h4> directly under an <h2>, skipping a level;
 *   - the service names were plain text with a stray trailing hyphen and no
 *     link, so there was no path from the homepage to a service page;
 *   - the project titles sat under an <h3> as <h4>, which is correct, so they
 *     were left alone.
 */
export default function Services({ projects = [] }) {
  const { ref, isVisible } = useInView();

  return (
    <section
      ref={ref}
      className={`${styles.sections} ${styles.reveal} ${isVisible ? styles.isVisible : ""}`}
      id="services"
      aria-labelledby="services-heading"
    >
      <div className={`${styles.sectionimg} ${styles.servicesImage}`}>
        <Image
          src="/random-jobs/IMG_3197.jpeg"
          alt="Completed loft conversion interior finish by Loft Maker London"
          sizes="(max-width: 1200px) 90vw, 55vw"
          style={{ objectFit: "cover" }}
          fill
          loading="lazy"
        />
      </div>

      <div className={`${styles.whatwedo} ${styles.servicesCopy}`}>
        <h2 id="services-heading">What We Do</h2>
        <p>
          At Loft Maker London, we believe every property has untapped potential.
          Whether it&apos;s a side return, a rear extension, an unused outbuilding, or a
          full structural overhaul, we specialise in bringing spaces to life &mdash;
          creating homes that work harder for the people who live in them.
        </p>
        <p>
          From the moment you get in touch, we take care of everything. Our in-house
          team handles the full journey: design and planning, structural engineering,
          roofing, steelwork, groundworks, and all the finishing touches that make a
          house feel like a home. One team, one point of contact, zero hassle.
        </p>
        <p>
          Every project we deliver is backed by a 10-year structural warranty &mdash;
          because we build things to last, and we stand behind every job we do. We
          don&apos;t cut corners and we don&apos;t settle for anything less than work
          we&apos;re genuinely proud of.
        </p>
        {projects.length > 0 ? (
          <div className={styles.projectList}>
            <h3 className={styles.projectHeading}>Recent Projects</h3>
            <ul>
              {projects.map((project) => (
                <li key={project._id} className={styles.projectItem}>
                  <h4>
                    <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                  </h4>
                  {project.summary ? <p>{project.summary}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className={`${styles.stagger} ${isVisible ? styles.isVisible : ""}`}>
        <ul>
          {topLevelServiceCards.map((service, index) => (
            <li key={service.href} style={{ "--delay": `${index * 80}ms` }}>
              <h3>
                <Link href={service.href}>{service.title}</Link>
              </h3>
              <p>{service.shortDescription}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}