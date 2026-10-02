import { renderTopLevelService, servicePageMetadata } from "@/lib/service-route";

export const metadata = servicePageMetadata("side-extensions");

export default function Page() {
  return renderTopLevelService("side-extensions");
}