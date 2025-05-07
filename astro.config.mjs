import { defineConfig } from "astro/config";
import vercelStatic from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://f1-corner-iota.vercel.app/",
  prefetch: true,
  adapter: vercelStatic({
    webAnalytics: {
      enabled: true,
    },
  }),
  image: {
    domains: ["upload.wikimedia.org"],
    remotePatterns: [{ protocol: "https" }],
  },
  redirects: {
    "/ranking": "/ranking/drivers",
    "/es/ranking": "/es/ranking/drivers",
    "/races": "/races/last",
    "/es/races": "/es/races/last",
  },
});
