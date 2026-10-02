import Image from "next/image";
import Link from "next/link";

import styles from "./layout.module.css";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { businessSchema } from "@/lib/jsonld";
import { safeFetch } from "@/sanity/lib/safe-fetch";
import { companySettingsQuery } from "@/sanity/lib/queries";

import CallButton from "@/Components/CallButton/CallButton";
import CallTracking from "@/Components/CallTracking";
import Footer from "@/Components/Footer/Footer";
import HeaderNav from "@/Components/HeaderNav/HeaderNav";
import HeaderTitle from "@/Components/HeaderTitle/HeaderTitle";
import inner from "@/Components/Seo/inner.module.css";
import JsonLd from "@/Components/Seo/JsonLd";

/**
 * No `metadata` export here on purpose.
 *
 * This layout wraps every page, so exporting metadata from it stamped the same
 * title, description and `canonical: "/"` onto all of them - which is how
 * /gallery ended up canonicalising to the homepage. Every page now exports its
 * own metadata through buildPageMetadata(); this file only owns the sitewide
 * structured data and the shared chrome.
 */
export default async function SiteLayout({ children }) {
  const company = await safeFetch(companySettingsQuery);

  return (
    <div>
      <JsonLd
        data={[
          businessSchema(),
          {
            "@type": "WebSite",
            "@id": `${site.url}/#website`,
            url: site.url,
            name: site.name,
            inLanguage: "en-GB",
            publisher: { "@id": `${site.url}/#business` },
          },
          {
            "@type": "ItemList",
            name: "Services",
            itemListElement: services.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Service",
                name: service.title,
                url: `${site.url}${service.href}`,
              },
            })),
          },
        ]}
      />

      <a className={inner.skipLink} href="#main-content">
        Skip to main content
      </a>

      <header className={styles.header}>
        <Link href="/" aria-label={`${site.name} home`}>
          <HeaderTitle className={`${styles.display} ${styles.wordmark}`}>
            {site.name}
          </HeaderTitle>
        </Link>

        <HeaderNav />

        <Link href="/" aria-label={`${site.name} home`}>
          <Image
            src={site.logo}
            width={120}
            height={120}
            // The logo is above the fold in a fixed header. Loading it eagerly
            // keeps it out of the lazy-load path; `priority` stays reserved for
            // the single hero image.
            loading="eager"
            alt={`${site.name} logo`}
          />
        </Link>
      </header>

      <main id="main-content">{children}</main>

      <Footer company={company} />
      <CallButton />
      <CallTracking />
    </div>
  );
}
