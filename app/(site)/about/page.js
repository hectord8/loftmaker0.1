import Image from "next/image";

import Accreditations from "@/Components/Trust/Accreditations";
import Breadcrumbs from "@/Components/Seo/Breadcrumbs";
import CtaBand from "@/Components/Seo/CtaBand";
import FaqSection from "@/Components/Seo/FaqSection";
import PageHeader, { defaultHeaderActions } from "@/Components/Seo/PageHeader";
import Placeholder from "@/Components/Seo/Placeholder";
import Reviews from "@/Components/Trust/Reviews";
import Team from "@/Components/Trust/Team";
import TrustDetails from "@/Components/Trust/TrustDetails";
import { generalFaqs } from "@/content/faqs";
import { site } from "@/data/site";
import { serviceCards } from "@/data/services";
import { buildPageMetadata } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { safeFetch } from "@/sanity/lib/safe-fetch";
import { accreditationsQuery, companySettingsQuery, reviewsQuery } from "@/sanity/lib/queries";
import styles from "./page.module.css";

export const metadata = buildPageMetadata({
  title: "About Us",
  description: `Meet ${site.contactName} and the team behind Loft Maker London: an in-house crew doing loft conversions, extensions and steelwork across London and Essex.`,
  path: "/about",
});

export const revalidate = 300;

/**
 * About us.
 *
 * Written from what is actually known. Reviews, accreditations and insurance
 * details come from Sanity and are omitted entirely while empty - no invented
 * testimonials, no invented trade memberships, and no placeholder text visible
 * to visitors.
 */
export default async function AboutPage() {
  const [company, reviews, accreditations] = await Promise.all([
    safeFetch(companySettingsQuery),
    safeFetch(reviewsQuery),
    safeFetch(accreditationsQuery),
  ]);

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "About us", path: "/about" },
        ]}
      />

      <PageHeader
        eyebrow="About us"
        h1="About Loft Maker London"
        lede="An in-house construction team doing loft conversions, extensions, roofing and structural steelwork across London and Essex."
        actions={defaultHeaderActions}
      />

      <div className={styles.prose}>
        <h2>Who we are</h2>
        <p>
          Loft Maker London is run by {site.contactName}. We are a small team, and
          that is deliberate: the person who surveys your property is the person who
          designs it, and the person who answers the phone during the build is the
          same one who was on site the week before.
        </p>
        <p>
          We work on the buildings people actually live in &mdash; Victorian terraces,
          post-war semis, ex-local-authority houses and converted properties with
          awkward roofs &mdash; across London and Essex. Most of our work is loft
          conversions and the extensions that go with them, which means we spend our
          days on the part of a house that everybody else avoids: the structure, the
          roof and the point where new steel meets old brickwork.
        </p>

        <Placeholder text="OWNER TO PROVIDE: a short personal statement from Craig Darrach - how the business started, what he was doing before, and why he set it up." />

        <h2>How we work</h2>
        <p>
          We handle the whole job: survey, design, planning or permitted development,
          structural engineering, building regulations, the build itself, and the
          finishing. That is not a boast about being comprehensive, it is a practical
          response to how these projects go wrong. When the drawings, the consent and
          the build are handled by three different companies, the gaps between them
          are where budgets go.
        </p>
        <p>
          It also means you get a single point of contact and a single programme. If
          something on site needs a decision, it gets made by the person who designed
          it, in the same week, rather than passed up a chain and returned three weeks
          later as a query.
        </p>

        <h2>What we do</h2>
        <ul>
          {serviceCards.map((service) => (
            <li key={service.href}>
              <a href={service.href}>{service.title}</a> &mdash; {service.shortDescription}
            </li>
          ))}
        </ul>

        <h2>How we are covered</h2>
        <p>
          Every completed project carries a {site.warrantyYears}-year structural
          warranty, and the policy wording and schedule of cover are handed over with
          the completion certificate. We hold public liability and employers&apos; liability
          insurance for the work we do.
        </p>
        <Placeholder text="OWNER TO PROVIDE: insurance provider and level of cover, for the TrustDetails block below." />
      </div>

      <TrustDetails company={company} />
      <Accreditations accreditations={accreditations} />
      <Team company={company} />

      {company?.teamImage?.url ? (
        <figure className={styles.figure}>
          <Image
            src={urlFor(company.teamImage).width(1200).auto("format").url()}
            alt={company.teamImage.altText || ""}
            width={company.teamImage.metadata?.width || 1200}
            height={company.teamImage.metadata?.height || 800}
            sizes="(max-width: 1200px) 92vw, 1000px"
          />
        </figure>
      ) : null}

      <Reviews reviews={reviews} />
      <FaqSection faqs={generalFaqs} heading="Common questions" />
      <CtaBand />
    </>
  );
}