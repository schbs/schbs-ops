// Capturas del portfolio (1280×800 y celular 390×844) en español (docs/capturas) e inglés (docs/capturas/en).
// Uso: npm run build && npm run capturas
import fs from "node:fs";
import path from "node:path";
import { test, type Page } from "@playwright/test";

const SECCIONES = [
  ["2-dia", "#titulo-dia"],
  ["3-familias", "#titulo-familias"],
  ["4-discord", "#titulo-discord"],
  ["5-diseno", "#titulo-diseno"],
  ["6-ejecuciones", "#titulo-panel"],
  ["7-proceso", "#titulo-proceso"],
] as const;

async function alinear(page: Page, selector: string) {
  await page.locator(selector).first().evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 24));
  await page.waitForTimeout(200);
}

for (const idioma of ["es", "en"] as const) {
  test(`capturas ${idioma}`, async ({ page }) => {
    const carpeta = idioma === "en" ? path.join("docs", "capturas", "en") : path.join("docs", "capturas");
    fs.mkdirSync(carpeta, { recursive: true });
    const foto = (nombre: string) => page.screenshot({ path: path.join(carpeta, `${nombre}.png`) });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(idioma === "en" ? "/en" : "/");
    await page.waitForLoadState("networkidle");
    await foto("1-portada");
    for (const [nombre, selector] of SECCIONES) {
      await alinear(page, selector);
      await foto(nombre);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(idioma === "en" ? "/en" : "/");
    await page.waitForLoadState("networkidle");
    await foto("8-celular");
  });
}
