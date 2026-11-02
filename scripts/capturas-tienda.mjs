// Capturas de la tienda pública schbscorp.com para la sección "El diseño de la tienda": la home en compu y el listado
// de productos en celular. Solo páginas públicas; espera 2 s entre pedidos. Uso: node scripts/capturas-tienda.mjs
import path from "node:path";
import { chromium } from "@playwright/test";

const BRAVE = process.env.BRAVE_PATH ?? path.join(process.env.LOCALAPPDATA ?? "", "BraveSoftware/Brave-Browser/Application/brave.exe");
const UA = "SCHBS-Ops-capturas/1.0 (portfolio de Germán Schouabs)";
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
// Esconde el aviso de cookies solo en la captura (no lo acepta).
const sinAvisoCookies = (p) =>
  p.evaluate(() => {
    for (const el of document.querySelectorAll("body *")) {
      if (/uso de cookies/i.test(el.textContent ?? "") && el.children.length < 6 && el.getBoundingClientRect().height < 220) el.style.display = "none";
    }
  });

const navegador = await chromium.launch({ executablePath: BRAVE });
try {
  const compu = await navegador.newPage({ viewport: { width: 1280, height: 800 }, userAgent: UA });
  await compu.goto("https://schbscorp.com/", { waitUntil: "networkidle", timeout: 60_000 });
  await esperar(2000);
  await sinAvisoCookies(compu);
  await compu.screenshot({ path: "public/tienda-home.jpg", type: "jpeg", quality: 82 });

  // El listado de productos (el primer link a /productos/ de la home).
  const ficha = await compu.locator('a[href*="/productos/"]').first().getAttribute("href");
  console.log(`Ficha: ${ficha}`);
  await esperar(2000);

  const celular = await navegador.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, userAgent: UA });
  await celular.goto(new URL(ficha, "https://schbscorp.com").toString(), { waitUntil: "networkidle", timeout: 60_000 });
  await esperar(2000);
  await sinAvisoCookies(celular);
  await celular.screenshot({ path: "public/tienda-ficha.jpg", type: "jpeg", quality: 82 });
  console.log("Capturas en public/");
} finally {
  await navegador.close();
}
