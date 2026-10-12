import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// `import.meta.dirname` is the ESM equivalent of `__dirname`, and is what the
// native config loader expects in current Vite.
const root = import.meta.dirname;

// The `@/*` alias matches the convention the ported shadcn/ui components from
// `fds-fe` were written against, so their imports work without editing.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(root, "./src"),
    },
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: false,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    target: "es2022",
  },
});
