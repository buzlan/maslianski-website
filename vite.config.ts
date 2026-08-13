import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";

const SPA_ROUTES = [
  "/services/evlk",
  "/services/phlebectomy",
  "/services/sclerotherapy",
  "/services/telangiectasia",
];

function githubPagesSpaFallback(): Plugin {
  return {
    name: "github-pages-spa-fallback",
    closeBundle() {
      const dist = resolve(__dirname, "dist");
      const indexHtml = resolve(dist, "index.html");
      if (!existsSync(indexHtml)) return;

      copyFileSync(indexHtml, resolve(dist, "404.html"));

      for (const route of SPA_ROUTES) {
        const dir = resolve(dist, route.slice(1));
        mkdirSync(dir, { recursive: true });
        copyFileSync(indexHtml, resolve(dir, "index.html"));
      }
    },
  };
}

// Проверяем наличие файла CNAME для определения кастомного домена
const hasCustomDomain = existsSync(resolve(__dirname, "public/CNAME"));

// Если используется кастомный домен, base должен быть '/'
// Иначе используем '/maslyansky-website/' для GitHub Pages
const base = hasCustomDomain 
  ? '/' 
  : (process.env.GITHUB_PAGES === 'true' ? '/maslyansky-website/' : '/');

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), githubPagesSpaFallback()],
  base,
});