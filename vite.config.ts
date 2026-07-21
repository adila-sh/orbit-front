import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vitest/config";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const config = defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    // O plugin do router precisa vir antes do plugin do React.
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    tailwindcss(),
    viteReact(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: true,
  },
});

export default config;
