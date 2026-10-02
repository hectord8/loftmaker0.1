import { notFound } from "next/navigation";

import ServicePage from "@/Components/ServicePage/ServicePage";
import { getServiceBySlug } from "@/content/services";
import { buildPageMetadata } from "@/lib/seo";

/**
 * Route helpers for the service pages.
 *
 * Each service file in content/services declares its own `href`, so the route
 * files are thin: they hand the slug to these helpers and the shared renderer
 * draws everything from the registry. A route and a page can therefore never
 * disagree about the URL, the title or the breadcrumb depth.
 */
export function servicePageMetadata(slug) {
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return buildPageMetadata({
    title: service.title,
    description: service.metaDescription,
    path: service.href,
  });
}

export function renderTopLevelService(slug) {
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <ServicePage
      service={service}
      trail={[
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: service.title, path: service.href },
      ]}
    />
  );
}

export function renderChildService(slug) {
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const parent = getServiceBySlug(service.parent);

  return (
    <ServicePage
      service={service}
      trail={[
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: parent.title, path: parent.href },
        { name: service.title, path: service.href },
      ]}
    />
  );
}