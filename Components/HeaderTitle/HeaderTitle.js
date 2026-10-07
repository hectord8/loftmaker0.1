"use client";

import { useState, useEffect } from "react";
import styles from "./headertitle.module.css";

export default function HeaderTitle({ children, className }) {
  const [heroPassed, setHeroPassed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector("[data-hero]");
      if (hero) setHeroPassed(hero.getBoundingClientRect().bottom <= 0);
    };
    handleScroll();
    const hero = document.querySelector("[data-hero]");
    const observer = hero
      ? new IntersectionObserver(
          ([entry]) => setHeroPassed(!entry.isIntersecting),
          { threshold: 0 },
        )
      : null;
    if (hero) observer.observe(hero);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <h1 className={`${className} ${heroPassed ? styles.visible : styles.hidden}`}>
      {children}
    </h1>
  );
}
