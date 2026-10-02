import { renderTopLevelService, servicePageMetadata } from "@/lib/service-route";

export const metadata = servicePageMetadata("grp-flat-roofing");

export default function Page() {
  return renderTopLevelService("grp-flat-roofing");
}