import { defineConfig } from "astro/config";

import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  integrations: [prefetch()],
  image: {
    domains: ["upload.wikimedia.org"],
    remotePatterns: [{ protocol: "https"}]
  }
});
