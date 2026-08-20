"use client";

import { useEffect, useState } from "react";

import { site } from "@/data/site";
import styles from "../app/(site)/page.module.css";

export default function HeroWordmark() {
  const [heroPassed, setHeroPassed] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroPassed(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <span className={`${styles.heroBrand} ${heroPassed ? styles.heroBrandHidden : ""}`} aria-hidden="true">
      {site.name}
    </span>
  );
}
