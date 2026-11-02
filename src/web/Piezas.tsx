// Las 4 piezas flotantes del hero (DESIGN.md §7): ejemplos de la operación real, sin datos reales. Cada una lleva el
// rótulo "Ejemplo". En compu flotan alrededor del título; en celular se apilan debajo.
import { textos, type Idioma } from "./textos";

function Rotulo({ texto }: { texto: string }) {
  return <span className="text-sm text-etiqueta">{texto}</span>;
}

export function PiezaFoto({ idioma }: { idioma: Idioma }) {
  const t = textos(idioma).piezas;
  return (
    <figure className="flotante p-4">
      <div className="flex items-center justify-between gap-2">
        <figcaption className="font-medium">{t.foto.titulo}</figcaption>
        <Rotulo texto={t.ejemplo} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2" aria-hidden="true">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[12px] bg-borde">
          {/* Prenda "de celular": fondo con ruido y sombra dura. */}
          <svg viewBox="0 0 60 80" className="h-full w-full">
            <rect width="60" height="80" fill="oklch(0.86 0.02 80)" />
            <path d="M14 22 L22 16 Q30 20 38 16 L46 22 L42 30 L40 28 L40 66 L20 66 L20 28 L18 30 Z" fill="oklch(0.35 0.03 250)" transform="rotate(-6 30 40)" />
          </svg>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden rounded-[12px] bg-papel ring-1 ring-borde">
          <svg viewBox="0 0 60 80" className="h-full w-full">
            <rect width="60" height="80" fill="oklch(0.99 0.003 100)" />
            <ellipse cx="30" cy="70" rx="15" ry="2" fill="oklch(0.9 0.006 120)" />
            <path d="M14 22 L22 16 Q30 20 38 16 L46 22 L42 30 L40 28 L40 66 L20 66 L20 28 L18 30 Z" fill="oklch(0.35 0.03 250)" />
          </svg>
        </div>
      </div>
      <p className="mt-2 flex justify-between text-sm text-tinta-suave">
        <span>{t.foto.de}</span>
        <span aria-hidden="true">→</span>
        <span>{t.foto.a}</span>
      </p>
      <p className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-ok">
        <Check /> {t.foto.estado}
      </p>
    </figure>
  );
}

export function PiezaDiscord({ idioma }: { idioma: Idioma }) {
  const t = textos(idioma).piezas;
  return (
    <figure className="flotante p-4">
      <div className="flex items-center justify-between gap-2">
        <figcaption className="font-mono text-sm font-medium">{t.discord.canal}</figcaption>
        <Rotulo texto={t.ejemplo} />
      </div>
      <div className="mt-3 flex gap-3">
        <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-tinta text-sm font-medium text-papel">
          n8n
        </span>
        <div className="min-w-0">
          <p className="text-sm">{t.discord.texto}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {t.discord.botones.map((b, i) => (
              <li key={b} className={`rounded-full px-3 py-1 text-sm ${i === 0 ? "bg-ok text-papel" : i === 3 ? "bg-niebla text-alerta" : "bg-niebla"}`}>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}

export function PiezaAviso({ idioma }: { idioma: Idioma }) {
  const t = textos(idioma).piezas;
  return (
    <figure className="flotante p-4">
      <div className="flex items-center justify-between gap-2">
        <figcaption className="font-medium">{t.aviso.titulo}</figcaption>
        <Rotulo texto={t.ejemplo} />
      </div>
      <p className="mt-3 rounded-[16px] bg-yerba-suave px-3 py-2 text-sm text-monte">
        <span className="font-mono">wa.me/…</span> · {t.aviso.texto}
      </p>
      <p className="mt-2 inline-flex items-center gap-1 text-sm text-tinta-suave">
        <Check /> {t.aviso.estado}
      </p>
    </figure>
  );
}

export function PiezaReporte({ idioma }: { idioma: Idioma }) {
  const t = textos(idioma).piezas;
  return (
    <figure className="flotante p-4">
      <div className="flex items-center justify-between gap-2">
        <figcaption className="font-medium">{t.reporte.titulo}</figcaption>
        <Rotulo texto={t.ejemplo} />
      </div>
      <svg viewBox="0 0 200 50" className="mt-3 h-12 w-full" aria-hidden="true">
        <path d="M0 40 L25 34 L50 36 L75 24 L100 28 L125 18 L150 22 L175 10 L200 14" fill="none" stroke="oklch(0.36 0.07 140)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <p className="mt-1 text-sm text-tinta-suave">{t.reporte.linea}</p>
      <p className="text-3xl font-medium leading-none">
        1.2k <span className="text-sm font-normal text-tinta-suave">{t.reporte.cupo}</span>
      </p>
    </figure>
  );
}

function Check() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}
