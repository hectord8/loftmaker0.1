import Image from "next/image";

import styles from "./layout.module.css";
import { site } from "@/data/site";
import { getHomePage, getLoftPages, getSiteSettings } from "@/sanity/lib/content";
import Link from "next/link";
import CallButton from "@/Components/CallButton/CallButton";
import SiteHeader from "@/Components/SiteHeader/SiteHeader";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: settings.seoTitle,
      template: `%s | ${settings.name}`,
    },
    description: settings.seoDescription,
    keywords: settings.seoKeywords,
    applicationName: settings.name,
    formatDetection: { telephone: true, email: true },
    openGraph: {
      title: settings.seoTitle,
      description: settings.seoDescription,
      url: "/",
      siteName: settings.name,
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
      title: settings.seoTitle,
      description: settings.seoDescription,
      images: [site.image],
    },
    icons: {
      icon: "/logo.png",
      apple: "/icon-192.png",
    },
  };
}

export default async function SiteLayout({ children }) {
  const [settings, home, loftPages] = await Promise.all([
    getSiteSettings(),
    getHomePage(),
    getLoftPages(),
  ]);
  const loftTypes = loftPages.filter((page) => page.pageType === "type");

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            "@id": `${site.url}/#business`,
            name: settings.name,
            url: site.url,
            logo: `${site.url}/logo.png`,
            description: settings.seoDescription,
            areaServed: settings.areaServed.map((name) => ({ "@type": "Place", name })),
            telephone: settings.phoneE164,
            email: settings.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: settings.address.street,
              addressLocality: settings.address.town,
              addressRegion: settings.address.county,
              postalCode: settings.address.postcode,
              addressCountry: site.address.country,
            },
            openingHours: site.openingHours,
            image: `${site.url}${site.image}`,
            sameAs: [settings.instagram].filter(Boolean),
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Services",
              itemListElement: home.services.map((service) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: service.title.replace(/\s*-\s*$/, ""),
                  description: service.description,
                },
              })),
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader name={settings.name} loftPages={loftTypes.map(({ slug, title }) => ({ slug, title }))} />
      <main id="main-content">{children}</main>
      <footer className={styles.footer}>
        <div className={styles.top}>
          <div className={styles.column}>
            <h3>Contact</h3>
            <address>
              <ul>
                {settings.contactName ? <li>{settings.contactName}</li> : null}
                <li>
                  {[settings.address.street, settings.address.town, settings.address.postcode].filter(Boolean).join(", ")}
                </li>
                <li><a href={`mailto:${settings.email}`}>{settings.email}</a></li>
                <li><a href={`tel:${settings.phoneE164}`}>{settings.phone}</a></li>
                {settings.instagram ? (
                  <li>
                    <a href={settings.instagram}>@Loft Maker</a>
                  </li>
                ) : null}
              </ul>
            </address>
          </div>
          <div className={styles.column}>
            <h3>Office hours </h3>
            <ul>
              {settings.officeHours.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            <h3>{settings.footerHeading}</h3>
            <p>{settings.footerText}</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <Image
            src="/logo.png"
            width={120}
            height={120}
            alt={`${settings.name} logo`}
          />

        </div>
      </footer>
      <CallButton phone={settings.phone} email={settings.email} />
      
    </div>
    
  );
}
