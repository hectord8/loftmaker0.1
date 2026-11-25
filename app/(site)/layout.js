import Image from "next/image";

import styles from "./layout.module.css";
import { services } from "@/data/services";
import { site } from "@/data/site";
import Link from "next/link";
import CallButton from "@/Components/CallButton/CallButton";
import HeaderTitle from "@/Components/HeaderTitle/HeaderTitle";

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  formatDetection: { telephone: true, email: true },
  openGraph: {
    title: site.title,
    description: site.description,
    url: "/",
    siteName: site.name,
    images: [
      {
        url: site.image,
        width: 1200,
        height: 630,
        alt: "Loft conversion project exterior",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.image],
  },
  icons: {
    icon: "/logo.png",
    apple: "/icon-192.png",
  },
};

export default function SiteLayout({ children }) {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            "@id": `${site.url}/#business`,
            name: site.name,
            url: site.url,
            logo: `${site.url}/logo.png`,
            description: site.description,
            areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
            telephone: site.phoneE164,
            email: site.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: site.address.street,
              addressLocality: site.address.town,
              addressRegion: site.address.county,
              postalCode: site.address.postcode,
              addressCountry: site.address.country,
            },
            openingHours: site.openingHours,
            image: `${site.url}${site.image}`,
            sameAs: [site.instagram],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Services",
              itemListElement: services.map((service) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: service.title.replace(/\s*-\s*$/, ""),
                  description: service.description,
                },
              })),
            },
          }),
        }}
      />
      
      <header className={styles.header}>
        <Link href="/">
         <HeaderTitle className={`${styles.display} ${styles.wordmark}`}>{site.name}</HeaderTitle>
        </Link>
        
        <Link href="/">
        <Image
          src="/logo.png"
          width={120}
          height={120}
          alt={`${site.name} logo`}
        />
        </Link>
      </header>
      <main id="main-content">{children}</main>
      <footer className={styles.footer}>
        <div className={styles.top}>
          <div className={styles.column}>
            <h3>Contact</h3>
            <address>
              <ul>
                <li>Craig Darrach</li>
                <li>
                  {site.address.street}, {site.address.town}, {site.address.postcode}
                </li>
                <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
                <li>{site.phone}</li>
                <li>
                  <a href={site.instagram}>@Loft Maker</a>
                </li>
              </ul>
            </address>
          </div>
          <div className={styles.column}>
            <h3>Office hours </h3>
            <ul>
              <li>Mon -Fri 8:00 - 18:00</li>
              <li> Sat: 10:00 - 15:00</li>
              <li> Sunday CLOSED</li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3>Loft Maker London</h3>
            <p>
              Reliable construction services London homeowners count on.
              No-nonsense contracting across London and Essex.
            </p>
          </div>
        </div>
        <div className={styles.bottom}>
          <Image
            src="/logo.png"
            width={120}
            height={120}
            alt="Loft Maker London logo"
          />

        </div>
      </footer>
      <CallButton />
      
    </div>
    
  );
}
