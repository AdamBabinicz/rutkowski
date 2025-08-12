import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // POPRAWKA: Teraz '@' wskazuje na folder 'src' w głównym katalogu
      "@": path.resolve(import.meta.dirname, "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },

  // USUWAMY TĘ LINIĘ: Nie ma już niestandardowego 'root'
  // root: path.resolve(import.meta.dirname, "client"),

  build: {
    // Ta linia jest już poprawna, zostawiamy ją
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
