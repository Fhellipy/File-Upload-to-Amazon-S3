import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      {
        find: "@shared",
        replacement: resolve("src/shared"),
      },
      {
        find: "@styles",
        replacement: resolve("src/shared/styles"),
      },
      {
        find: "@modules",
        replacement: resolve("src/modules"),
      },
      {
        find: "@pages",
        replacement: resolve("src/pages"),
      },
      {
        find: "@routes",
        replacement: resolve("src/routes"),
      },
      {
        find: "@",
        replacement: resolve("src"),
      },
    ],
  },
});
