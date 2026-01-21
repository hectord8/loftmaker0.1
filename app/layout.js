import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import styles from "./layout.module.css";
import { services } from "@/data/services";
import { site } from "@/data/site";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description: site.description,
  keywords: site.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
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
    title: site.name,
    description: site.description,
    images: [site.image],
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: site.name,
              url: site.url,
              description: site.description,
              areaServed: site.areaServed,
              telephone: site.phone,
              email: site.email,
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
        <a className={styles.skipLink} href="#main-content">
          Skip to content
        </a>
        <header className={styles.header}>
          <h1 className={styles.display}>{site.name}</h1>
          <Image
            src="/logo.png"
            width={120}
            height={120}
            alt={`${site.name} logo`}
          />
        </header>
        <main id="main-content">{children}</main>
        <footer className={styles.footer}>
            <div className={styles.top}>
              <div className={styles.column}>
                <h3>Contact</h3>
                <address>
                  <ul>
                    <li>Craig Darrach</li>
                    <li>{site.email}</li>
                    <li>{site.phone}</li>
                    <li>
                      <a href={site.instagram}>
                        @Loft Maker
                      </a>
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
                <p>High quality, reliable, personal contracting and construction services throughout the London and wider Essex region.</p>
              </div>
            </div>
            <div className={styles.bottom}>
              <Image
                src="/logo.png"
                width={120}
                height={120}
                alt="Loft Maker London logo"
              />
            <p>Website made by Hector Darrach</p>
               </div>
        </footer>
      </body>
    </html>
  );
}
