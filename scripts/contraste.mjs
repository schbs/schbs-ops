// Contraste WCAG de cada par texto/fondo de la paleta (docs/DESIGN.md §3), calculado desde OKLCH.
// Falla si alguno no da AA.
const C = {
  papel: [0.99, 0.003, 100], niebla: [0.965, 0.004, 120], tinta: [0.22, 0.015, 160], "tinta-suave": [0.48, 0.012, 160],
  etiqueta: [0.55, 0.01, 160], pampa: [0.45, 0.1, 245], "yerba-suave": [0.92, 0.07, 125], monte: [0.36, 0.07, 140],
  alerta: [0.5, 0.17, 28], ok: [0.45, 0.1, 150],
};

// [texto, fondo, mínimo, uso]: 4,5 texto normal; 3 bordes, íconos, foco y gráficos.
const PARES = [
  ["tinta", "papel", 4.5], ["tinta", "niebla", 4.5], ["tinta-suave", "papel", 4.5], ["tinta-suave", "niebla", 4.5],
  ["etiqueta", "papel", 4.5], ["pampa", "papel", 4.5], ["pampa", "niebla", 4.5], ["papel", "tinta", 4.5],
  ["papel", "pampa", 4.5], ["monte", "yerba-suave", 4.5], ["tinta", "yerba-suave", 4.5], ["alerta", "papel", 4.5],
  ["ok", "papel", 4.5], ["pampa", "papel", 3, "foco"], ["monte", "papel", 3, "gráfico"], ["pampa", "niebla", 3, "gráfico"],
];

function oklchASrgb([L, Cr, h]) {
  const a = Cr * Math.cos((h * Math.PI) / 180), b = Cr * Math.sin((h * Math.PI) / 180);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b, m_ = L - 0.1055613458 * a - 0.0638541728 * b, s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map((v) => Math.min(1, Math.max(0, v)));
}
const luminancia = (c) => { const [r, g, b] = oklchASrgb(c); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const contraste = (x, y) => { const [a, b] = [luminancia(C[x]), luminancia(C[y])].sort((p, q) => q - p); return (a + 0.05) / (b + 0.05); };

let fallan = 0;
for (const [t, f, min, uso = "texto"] of PARES) {
  const r = contraste(t, f);
  const ok = r >= min;
  if (!ok) fallan++;
  console.log(`${ok ? "OK   " : "FALLA"}  ${t.padEnd(12)} sobre ${f.padEnd(12)} ${r.toFixed(2)}:1  (${uso}, mínimo ${min})`);
}
console.log(`\n${PARES.length - fallan}/${PARES.length} pares en AA.`);
process.exit(fallan ? 1 : 0);
