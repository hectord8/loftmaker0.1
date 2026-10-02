import ContactForm from "@/Components/ContactForm/ContactForm";
import Breadcrumbs from "@/Components/Seo/Breadcrumbs";
import FaqSection from "@/Components/Seo/FaqSection";
import NapBlock from "@/Components/Trust/NapBlock";
import PageHeader from "@/Components/Seo/PageHeader";
import { generalFaqs } from "@/content/faqs";
import { openingHoursText, site } from "@/data/site";
import { serviceCards } from "@/data/services";
import { buildPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = buildPageMetadata({
  title: "Contact Us",
  description: `Speak to ${site.contactName} about a loft conversion, extension or steelwork project in London or Essex. Call ${site.phoneDisplay} or send an enquiry - no obligation.`,
  path: "/contact",
});

/**
 * Contact page.
 *
 * Carries the NAP block and the same opening hours as the footer, so the details
 * are consistent wherever they appear. No postal address is stated because none
 * has been confirmed; the NAP block describes the service area instead, which
 * is the accurate position for a mobile business.
 */
export default function ContactPage() {
  return (
    <>
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <PageHeader
        eyebrow="Get in touch"
        h1="Contact Loft Maker London"
        lede="Tell us about your property and what you want to do with it. We will come back to you with honest advice on what is possible, what it involves and roughly what it takes."
        actions={[
          { label: `Call ${site.phoneDisplay}`, href: site.telHref, placement: "contact-header" },
        ]}
      />

      <div className={styles.formSection}>
        <h2>Send an enquiry</h2>
        <p className={styles.formLede}>
          The more you can tell us about the property and the space, the more
          useful our first reply will be. If you have drawings, survey results or
          previous correspondence, mention it below.
        </p>
        <ContactForm />
      </div>

      <div className={styles.side}>
        <NapBlock heading="Our details" />

        <section className={styles.opening}>
          <h2>Opening hours</h2>
          <ul>
            {openingHoursText.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section className={styles.side}>
          <h2>Services</h2>
          <ul>
            {serviceCards.map((service) => (
              <li key={service.href}>
                <a href={service.href}>{service.title}</a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <FaqSection faqs={generalFaqs} heading="Before you get in touch" />
    </>
  );
}