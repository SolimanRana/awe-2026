import { defineConfig } from "vite";

// DEMO 9: GitHub Pages serves this repo as a PROJECT page, not a user/org
// root page - the live URL is https://<user>.github.io/mystery-road-awe-2026/,
// not https://<user>.github.io/. Vite's default `base: "/"` bakes absolute
// root-relative paths like /assets/index-xxxx.js into dist/index.html,
// which would 404 once the site is actually served one level down, under
// /mystery-road-awe-2026/ instead of /. Setting `base` explicitly to the
// repo name fixes every generated asset URL to include that prefix.
export default defineConfig({
  base: "/awe-2026/",
});
