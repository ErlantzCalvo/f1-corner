import { defineConfig } from "astro/config";
import vercelStatic from "@astrojs/vercel/static";
import sitemap from "@astrojs/sitemap";

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
  integrations: [sitemap()],
});
