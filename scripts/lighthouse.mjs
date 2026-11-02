// Lighthouse móvil (throttling simulado) sobre el build de producción local, con Brave sin interfaz.
// Mide la portada en español y en inglés. Imprime los 4 puntajes y sale con error si alguno es < 90.
// Uso: npm run build:web && npm run lighthouse      (3 corridas por página, mediana por rendimiento)
//      npm run lighthouse -- --corridas=1
import { execFileSync, spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const PUERTO = 3209;
const BASE = `http://localhost:${PUERTO}`;
const PAGINAS = ["/", "/en"];
const corridas = Number(process.argv.find((a) => a.startsWith("--corridas="))?.split("=")[1] ?? 3);
const BRAVE = process.env.BRAVE_PATH ?? path.join(process.env.LOCALAPPDATA ?? "", "BraveSoftware/Brave-Browser/Application/brave.exe");
const LH = path.join("node_modules", "lighthouse", "cli", "index.js");
const carpeta = mkdtempSync(path.join(tmpdir(), "lh-schbs-ops-"));
const CATEGORIAS = ["performance", "accessibility", "best-practices", "seo"];

async function servidorArriba() {
  try {
    return (await fetch(BASE)).ok;
  } catch {
    return false;
  }
}

function medir(ruta, archivo) {
  execFileSync(
    process.execPath,
    [LH, `${BASE}${ruta}`, "--form-factor=mobile", `--only-categories=${CATEGORIAS.join(",")}`, "--chrome-flags=--headless=new", "--output=json", `--output-path=${archivo}`, "--quiet"],
    { env: { ...process.env, CHROME_PATH: BRAVE }, stdio: "ignore" },
  );
  const r = JSON.parse(readFileSync(archivo, "utf8"));
  const puntajes = Object.fromEntries(CATEGORIAS.map((c) => [c, Math.round((r.categories[c]?.score ?? 0) * 100)]));
  const bajos = Object.values(r.categories).flatMap((c) =>
    c.auditRefs.filter((ref) => ref.weight > 0 && r.audits[ref.id].score !== null && r.audits[ref.id].score < 0.9).map((ref) => `${c.id}:${ref.id}`),
  );
  return { ...puntajes, lcp: r.audits["largest-contentful-paint"].numericValue / 1000, bajos };
}

let servidor = null;
if (!(await servidorArriba())) {
  servidor = spawn(process.execPath, [path.join("node_modules", "next", "dist", "bin", "next"), "start", "-p", String(PUERTO)], { stdio: "ignore" });
  for (let i = 0; i < 60 && !(await servidorArriba()); i++) await new Promise((r) => setTimeout(r, 1000));
}

let fallo = false;
const medidas = {};
try {
  console.log(`Lighthouse móvil · ${corridas} corrida(s) por página · mediana por rendimiento`);
  console.log("página    rend  acces  b.práct  seo   LCP");
  for (const ruta of PAGINAS) {
    const todas = [];
    for (let i = 0; i < corridas; i++) todas.push(medir(ruta, path.join(carpeta, `${ruta.replaceAll("/", "_") || "inicio"}-${i}.json`)));
    const m = [...todas].sort((a, b) => a.performance - b.performance)[Math.floor(todas.length / 2)];
    medidas[ruta] = { performance: m.performance, accessibility: m.accessibility, bestPractices: m["best-practices"], seo: m.seo, lcpSegundos: Number(m.lcp.toFixed(2)) };
    const ok = CATEGORIAS.every((c) => m[c] >= 90);
    fallo ||= !ok;
    console.log(`${ruta.padEnd(9)} ${String(m.performance).padStart(4)}  ${String(m.accessibility).padStart(5)}  ${String(m["best-practices"]).padStart(7)}  ${String(m.seo).padStart(4)}  ${m.lcp.toFixed(2)} s  ${ok ? "✓" : "✗"}`);
    if (m.bajos.length) console.log(`         auditorías bajo 0,9: ${m.bajos.join(", ")}`);
  }
} finally {
  if (servidor?.pid) {
    if (process.platform === "win32") execFileSync("taskkill", ["/pid", String(servidor.pid), "/T", "/F"], { stdio: "ignore" });
    else servidor.kill();
  }
}
mkdirSync(path.join("docs", "resultados"), { recursive: true });
writeFileSync(
  path.join("docs", "resultados", "lighthouse.json"),
  JSON.stringify({ fecha: new Date().toISOString(), metodo: `Lighthouse 12 móvil (throttling simulado) en Brave sin interfaz, build de producción local, mediana de ${corridas} corridas`, paginas: medidas }, null, 2) + "\n",
);
console.log(fallo ? "\n✗ Algún puntaje quedó por debajo de 90." : "\n✓ Los 4 puntajes ≥ 90 en todas las páginas.");
process.exit(fallo ? 1 : 0);
