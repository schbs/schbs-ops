// Capturas del portfolio: misma configuración que los e2e (build y Brave), otra carpeta de tests.
import { defineConfig } from "@playwright/test";
import base from "./playwright.config";

export default defineConfig({
  ...base,
  testDir: "tests/capturas",
  projects: [{ name: "capturas" }],
});
