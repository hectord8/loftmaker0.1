import { notFound } from "next/navigation";

import { childServices } from "@/content/services";
import { renderChildService, servicePageMetadata } from "@/lib/service-route";

export function generateStaticParams() {
  return childServices("loft-conversions").map((service) => ({ variant: service.slug }));
}

/** params is a promise in Next 15+; awaiting it is what makes the slug resolve. */
export async function generateMetadata({ params }) {
  const { variant } = await params;
  return servicePageMetadata(variant);
}

export default async function Page({ params }) {
  const { variant } = await params;
  const known = childServices("loft-conversions").some((service) => service.slug === variant);
  if (!known) notFound();

  return renderChildService(variant);
}