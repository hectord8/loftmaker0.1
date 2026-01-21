import Image from "next/image";
import { services } from "@/data/services";
import styles from "../app/page.module.css";

export default function Services() {
  return (
    <section
      className={styles.sections}
      id="services"
      aria-labelledby="services-heading"
    >
      <div className={styles.sectionimg}>
        <Image
          src="/random-jobs/IMG_3197.jpeg"
          alt="Loft conversion interior finish"
          sizes="(max-width: 1200px) 90vw, 55vw"
          style={{ objectFit: "cover" }}
          fill
          loading="lazy"
        />
      </div>

      <div className={styles.whatwedo}>
        <h2 id="services-heading">What We Do</h2>
        <p>
          At Loft Makers London Ltd, we turn unused space into beautiful,
          practical living areas. From first sketches to final finishes, our
          expert team delivers loft conversions, side extensions, GRP flat roof
          installations, and structural steel work across London. With decades
          of construction and project-management experience, we're fully insured
          and back our craftsmanship with a 10-year structural warranty - so your
          investment is protected.
        </p>
      </div>

      <div>
        <ul>
          {services.map((service) => (
            <li key={service.title}>
              <h4>{service.title}</h4>
              <p>{service.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
