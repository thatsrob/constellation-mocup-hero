import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Update to your production domain before deploy
const site = "https://constellationmarketing.com";

export default defineConfig({
  site,
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
