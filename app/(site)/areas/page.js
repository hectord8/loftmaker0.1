import Link from "next/link";

import Breadcrumbs from "@/Components/Seo/Breadcrumbs";
import CtaBand from "@/Components/Seo/CtaBand";
import PageHeader, { defaultHeaderActions } from "@/Components/Seo/PageHeader";
import { areaCards } from "@/content/areas";
import { areaNames, site } from "@/data/site";
import { serviceCards } from "@/data/services";
import { buildPageMetadata } from "@/lib/seo";
import styles from "@/Components/Seo/inner.module.css";

export const metadata = buildPageMetadata({
  title: "Areas We Cover",
  description:
    "Loft Maker London works across London and Essex, including Chingford and South Woodford. Loft conversions, extensions, roofing and structural steelwork.",
  path: "/areas",
});

/**
 * /areas overview.
 *
 * The individual area pages are not published yet - the owner asked for them
 * to be skipped in this pass - so content/areas is an empty registry. This page
 * therefore states the areas served and links out to the services, and gains a
 * list of links automatically once area pages are added to that registry.
 */
export default function AreasPage() {
  return (
    <>
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Areas we cover", path: "/areas" },
        ]}
      />

      <PageHeader
        eyebrow="Where we work"
        h1="Areas we cover"
        lede={`We work across ${areaNames.join(", ")}. We are a mobile, service-area business, so we come to your property rather than asking you to visit us.`}
        actions={defaultHeaderActions}
      />

      <div className={styles.prose}>
        <h2>London and Essex</h2>
        <p>
          Our work is concentrated in London and Essex, and we take on projects
          across the boroughs and districts we already know. That matters more
          than it sounds: permitted development, conservation areas and local
          planning policies all differ from one street to the next, and being
          familiar with an area is the difference between telling you a project
          is straightforward and knowing which constraints it will actually hit.
        </p>
        <p>
          We currently work across {areaNames.slice(0, 2).join(" and ")}, including{" "}
          {areaNames.slice(2).join(" and ")}. If you are just outside those areas,
          get in touch anyway &mdash; the answer is usually yes, and we will tell
          you honestly if it is not.
        </p>

        {areaCards.length ? (
          <>
            <h2>Find your area</h2>
            <ul>
              {areaCards.map((area) => (
                <li key={area.href}>
                  <Link href={area.href}>{area.title}</Link> &mdash; {area.shortDescription}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h2>What we do in your area</h2>
        )}

        <p>
          Wherever you are, the work is the same: loft conversions, dormers,
          hip-to-gable and mansard roofs, side extensions, GRP flat roofing and
          structural steelwork, delivered by our own team and backed by a
          {` ${site.warrantyYears}-year structural warranty`}.
        </p>

        <h2>Our services</h2>
        <ul>
          {serviceCards.map((service) => (
            <li key={service.href}>
              <Link href={service.href}>{service.title}</Link> &mdash;{" "}
              {service.shortDescription}
            </li>
          ))}
        </ul>
      </div>

      <CtaBand />
    </>
  );
}