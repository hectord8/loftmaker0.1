import { renderTopLevelService, servicePageMetadata } from "@/lib/service-route";

export const metadata = servicePageMetadata("structural-steel");

export default function Page() {
  return renderTopLevelService("structural-steel");
}