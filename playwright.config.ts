// E2E con Playwright sobre el build de producción y Brave (ya instalado: no se descargan navegadores).
// Página estática: no usa servicios externos.
// Uso: npm run build && npm run test:e2e
import path from "node:path";
import { defineConfig } from "@playwright/test";

const BRAVE = process.env.BRAVE_PATH ?? path.join(process.env.LOCALAPPDATA ?? "", "BraveSoftware/Brave-Browser/Application/brave.exe");
const PUERTO = 3209;

export default defineConfig({
  testDir: "tests/e2e",
  workers: 1,
  fullyParallel: false,
  timeout: 90_000,
  expect: { timeout: 45_000 },
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PUERTO}`,
    launchOptions: { executablePath: BRAVE },
    locale: "es-AR",
    timezoneId: "America/Argentina/Buenos_Aires",
  },
  webServer: {
    command: `node node_modules/next/dist/bin/next start -p ${PUERTO}`,
    url: `http://localhost:${PUERTO}`,
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects: [
    { name: "compu", use: { viewport: { width: 1440, height: 900 } } },
    { name: "celular", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }, testMatch: /pagina/ },
  ],
});
