import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "AfriHope",
    description: site.mission,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    // Matches --color-teal-deep in app/globals.css's @theme block.
    theme_color: "#084b46",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
