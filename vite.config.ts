import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves this repo under /awe-2026/, so asset URLs need that prefix
export default defineConfig({
  base: "/awe-2026/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        react: "react.html",
      },
    },
  },
});
