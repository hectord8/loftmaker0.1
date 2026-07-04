"use client";

import { useState, useEffect } from "react";
import styles from "./headertitle.module.css";

export default function HeaderTitle({ children, className }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHidden(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <h1 className={`${className} ${hidden ? styles.hidden : ""}`}>
      {children}
    </h1>
  );
}
