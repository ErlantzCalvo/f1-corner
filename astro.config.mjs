import { defineConfig } from "astro/config";
import prefetch from "@astrojs/prefetch";
import vercelStatic from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercelStatic({
    webAnalytics: {
      enabled: true
    }
  }),
  integrations: [prefetch()],
  image: {
    domains: ["upload.wikimedia.org"],
    remotePatterns: [{ protocol: "https" }],
  },
});
