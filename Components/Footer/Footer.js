import Image from "next/image";
import Link from "next/link";

import { areaNames, openingHoursText, site } from "@/data/site";
import { serviceCards } from "@/data/services";
import { areaCards } from "@/content/areas";
import styles from "./footer.module.css";

/**
 * Sitewide footer: NAP block, service and area links, and company details.
 *
 * The address is only rendered once `site.address` is set. Until then the NAP
 * block states the areas served, which is the accurate description of a
 * service-area business and keeps the footer consistent with the schema.
 */
export default function Footer({ company = null }) {
  const companyNumber = company?.companyNumber || site.companyNumber;
  const legalName = company?.legalName || site.legalName;

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.column}>
          <h2>Contact</h2>
          <address>
            <ul>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={site.telHref} data-call-placement="footer">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>{site.contactName}</li>
              <li>
                <a href={site.instagram} rel="me noopener" target="_blank">
                  Instagram
                </a>
              </li>
            </ul>
          </address>
        </div>

        <div className={styles.column}>
          <h2>Where we work</h2>
          <ul>
            {site.address ? (
              <li>
                <address>
                  {site.address.streetAddress}
                  {site.address.addressLocality ? `, ${site.address.addressLocality}` : ""}
                  {site.address.postalCode ? `, ${site.address.postalCode}` : ""}
                </address>
              </li>
            ) : (
              <li>Working across {areaNames.join(", ")}</li>
            )}
            {areaCards.map((area) => (
              <li key={area.href}>
                <Link href={area.href}>{area.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h2>Services</h2>
          <ul>
            {serviceCards.map((service) => (
              <li key={service.href}>
                <Link href={service.href}>{service.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h2>Opening hours</h2>
          <ul>
            {openingHoursText.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h2>More</h2>
          <ul>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/gallery">Gallery</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/about">About us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            {areaCards.length > 0 ? null : (
              <li>
                <Link href="/areas">Areas we cover</Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/*
        Company registration and insurance details are only rendered once the
        owner has supplied them. Nothing here is invented.
      */}
      {legalName || companyNumber ? (
        <div className={styles.legal}>
          {legalName ? <p>{legalName}</p> : null}
          {companyNumber ? <p>Company number {companyNumber}</p> : null}
        </div>
      ) : null}

      <div className={styles.bottom}>
        <Image src={site.logo} width={80} height={80} alt={`${site.name} logo`} />
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} {site.name}. Loft conversions, extensions and
          structural steelwork across London and Essex.
        </p>
      </div>
    </footer>
  );
}
