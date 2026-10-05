import { defineConfig } from "vite";

// GitHub Pages serves this repo under /awe-2026/, so asset URLs need that prefix
export default defineConfig({
  base: "/awe-2026/",
});
