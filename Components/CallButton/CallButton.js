'use client';

import { useState, useEffect } from 'react';
import { site } from '@/data/site';
import styles from './callbutton.module.css';

export default function CallButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tel = `tel:+44${site.phone.slice(1)}`;
  const displayPhone = `${site.phone.slice(0, 5)} ${site.phone.slice(5)}`;
  const mailto = `mailto:${site.email}`;

  return (
    <div className={`${styles.wrapper} ${visible ? styles.visible : styles.hidden}`}>
      <div className={styles.container}>
        <a href={tel} className={styles.link} aria-label={`Call us on ${displayPhone}`}>
          <span className={styles.iconWrap}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </span>
          <span className={styles.linkContent}>
            <span className={styles.linkLabel}>Call us</span>
            <span className={styles.linkDetail}>{displayPhone}</span>
          </span>
        </a>
        <a href={mailto} className={styles.link} aria-label={`Email us at ${site.email}`}>
          <span className={styles.iconWrap}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
          </span>
          <span className={styles.linkContent}>
            <span className={styles.linkLabel}>Email us</span>
            <span className={styles.linkDetail}>{site.email}</span>
          </span>
        </a>
      </div>
    </div>
  );
}
