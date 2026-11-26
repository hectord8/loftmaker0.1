"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./siteheader.module.css";

const HEADER_OFFSET = 88; // roughly the bar's height: "passed" once the hero is under it

export default function SiteHeader({ name, loftPages = [] }) {
  const pathname = usePathname();
  const [overHero, setOverHero] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Re-check on every route change: the layout (and this header) persists
  // across client navigation, but each page has its own hero (or none).
  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    const update = () => setOverHero(Boolean(hero) && hero.getBoundingClientRect().bottom > HEADER_OFFSET);
    const frame = requestAnimationFrame(update);
    if (!hero) return () => cancelAnimationFrame(frame);

    const observer = new IntersectionObserver(update, {
      rootMargin: `-${HEADER_OFFSET}px 0px 0px 0px`,
      threshold: 0,
    });
    observer.observe(hero);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const hasContactForm = pathname === "/" || pathname.startsWith("/loft-conversions");
  const contactHref = hasContactForm ? "#contact" : "/#contact";
  const transparent = overHero && !menuOpen;

  return (
    <header className={`${styles.header} ${transparent ? styles.overHero : styles.solid}`}>
      <div className={styles.bar}>
        <Link href="/" className={`${styles.wordmark} ${overHero ? styles.wordmarkHidden : ""}`} aria-label={`${name} home`}>
          {name}
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.menuIcon} aria-hidden="true" />
          <span className="visuallyHidden">{menuOpen ? "Close menu" : "Open menu"}</span>
        </button>

        <nav
          id="site-nav"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          aria-label="Main"
          onClick={(event) => event.target.closest("a") && setMenuOpen(false)}
        >
          <ul className={styles.links}>
            <li>
              <Link href="/" className={isActive("/") ? styles.active : ""}>Home</Link>
            </li>
            <li className={styles.hasDropdown}>
              <Link href="/loft-conversions" className={isActive("/loft-conversions") ? styles.active : ""}>
                Loft conversions
              </Link>
              {loftPages.length > 0 ? (
                <ul className={styles.dropdown}>
                  {loftPages.map((page) => (
                    <li key={page.slug}>
                      <Link
                        href={`/loft-conversions/${page.slug}`}
                        className={pathname === `/loft-conversions/${page.slug}` ? styles.active : ""}
                      >
                        {page.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
            <li>
              <Link href="/gallery" className={isActive("/gallery") ? styles.active : ""}>Gallery</Link>
            </li>
          </ul>
          <a href={contactHref} className={`siteButton siteButtonPrimary ${styles.cta}`}>
            Free consultation
          </a>
        </nav>

        <Link href="/" className={styles.logo}>
          <Image src="/logo.png" width={56} height={56} alt={`${name} logo`} priority />
        </Link>
      </div>
    </header>
  );
}
