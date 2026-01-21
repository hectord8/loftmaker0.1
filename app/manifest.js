import { site } from "@/data/site";

export default function manifest() {
  return {
    name: site.name,
    short_name: "Loft Maker",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#e2e2e2",
    theme_color: "#e2e2e2",
    icons: [
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
