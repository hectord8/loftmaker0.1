import { renderTopLevelService, servicePageMetadata } from "@/lib/service-route";

export const metadata = servicePageMetadata("loft-conversions");

export default function Page() {
  return renderTopLevelService("loft-conversions");
}