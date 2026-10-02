"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { site } from "@/data/site";
import { topLevelServiceCards } from "@/content/services";
import styles from "./headernav.module.css";

/**
 * Primary navigation.
 *
 * The links are rendered in the server HTML at every breakpoint; the button
 * only toggles a CSS class on small screens. The same links are repeated in
 * the footer, so every page stays reachable in the markup itself.
 */
const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Areas", href: "/areas" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function HeaderNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);
  const toggleRef = useRef(null);

  /*
    Close the mobile panel on navigation. Adjusting the state during render
    rather than in an effect avoids the extra render pass, and the rule is that
    the panel is open for one route at a time.
  */
  const [openForPath, setOpenForPath] = useState(pathname);
  if (pathname !== openForPath) {
    setOpenForPath(pathname);
    setOpen(false);
  }

  // Escape closes the panel and returns focus to the control that opened it.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isCurrent = (href) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className={styles.wrapper}>
      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((current) => !current)}
      >
        <span className={styles.toggleIcon} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className={styles.toggleLabel}>Menu</span>
      </button>

      <nav
        ref={navRef}
        id="primary-navigation"
        className={`${styles.nav} ${open ? styles.open : ""}`}
        aria-label="Main"
      >
        <ul className={styles.list}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.link} ${isCurrent(item.href) ? styles.current : ""}`}
                aria-current={isCurrent(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <ul className={styles.serviceList}>
          {topLevelServiceCards.map((service) => (
            <li key={service.href}>
              <Link
                href={service.href}
                className={`${styles.serviceLink} ${
                  pathname === service.href ? styles.current : ""
                }`}
                aria-current={pathname === service.href ? "page" : undefined}
              >
                {service.label}
              </Link>
            </li>
          ))}
        </ul>

        <a className={styles.call} href={site.telHref} data-call-placement="mobile-nav">
          Call {site.phoneDisplay}
        </a>
      </nav>
    </div>
  );
}
