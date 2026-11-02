// La página del caso (DESIGN.md): hero con las 4 piezas flotantes y el hilo, cifras, un día de la tienda, las 9
// familias, Discord, el diseño de la tienda, el tablero de ejecuciones, cómo se trabaja y privacidad.
import Image from "next/image";
import { PiezaAviso, PiezaDiscord, PiezaFoto, PiezaReporte } from "./Piezas";
import { EJECUCIONES, textos, type Idioma } from "./textos";

const UPWORK = "https://www.upwork.com/freelancers/~017988686f2cff30a6";
const LINKEDIN = "https://www.linkedin.com/in/german-schouabs/";

export function Portada({ idioma }: { idioma: Idioma }) {
  const t = textos(idioma);
  const max = Math.max(...EJECUCIONES.map((e) => e.ejecuciones));
  const total = EJECUCIONES.reduce((s, e) => s + e.ejecuciones, 0);
  const n = (v: number) => v.toLocaleString(idioma === "en" ? "en-US" : "es-AR");

  return (
    <>
      {/* Hero: título serif centrado y las piezas alrededor (en celular, debajo). */}
      <section className="relative mx-auto max-w-[1200px] px-4 pt-8 pb-16 lg:pt-14">
        {/* El hilo pasa por arriba del título y por debajo de los botones: une las piezas sin cruzar el texto. */}
        <svg aria-hidden="true" viewBox="0 0 1200 640" preserveAspectRatio="none" className="hilo pointer-events-none absolute inset-x-4 top-24 hidden h-[640px] lg:block">
          <path d="M330 110 C 450 -30, 750 -30, 880 150 M360 545 C 500 650, 720 650, 905 480" fill="none" stroke="oklch(0.45 0.1 245 / 0.4)" strokeWidth="1.5" strokeDasharray="2 6" strokeLinecap="round" />
        </svg>
        <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.5fr_1fr] lg:items-center">
          <div className="order-2 grid gap-6 lg:order-1">
            <div className="entra lg:-rotate-2" style={{ "--i": 0 } as React.CSSProperties}>
              <PiezaFoto idioma={idioma} />
            </div>
            <div className="entra lg:ml-10 lg:rotate-1" style={{ "--i": 2 } as React.CSSProperties}>
              <PiezaAviso idioma={idioma} />
            </div>
          </div>
          <div className="order-1 text-center lg:order-2">
            <p className="text-sm font-medium uppercase tracking-wider text-pampa">{t.hero.kicker}</p>
            <h1 className="titulo-display mt-3 text-5xl text-balance sm:text-6xl lg:text-[5.5rem]">
              {t.hero.titulo[0]} <em className="italic">{t.hero.titulo[1]}</em>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-tinta-suave">{t.hero.bajada}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href="#familias" className="boton boton-relleno">
                {t.hero.cta}
              </a>
              <a href="https://schbscorp.com" className="boton boton-contorno" rel="noopener">
                {t.hero.cta2} <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="mt-4 text-sm text-etiqueta">{t.hero.aviso}</p>
          </div>
          <div className="order-3 grid gap-6">
            <div className="entra lg:mr-8 lg:rotate-2" style={{ "--i": 1 } as React.CSSProperties}>
              <PiezaDiscord idioma={idioma} />
            </div>
            <div className="entra lg:-rotate-1" style={{ "--i": 3 } as React.CSSProperties}>
              <PiezaReporte idioma={idioma} />
            </div>
          </div>
        </div>
      </section>

      {/* Cifras */}
      <section aria-label={idioma === "en" ? "Key figures" : "Cifras"} className="bg-niebla">
        <dl className="mx-auto grid max-w-[1200px] grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {t.cifras.map((c) => (
            <div key={c.texto}>
              <dt className="sr-only">{c.texto}</dt>
              <dd className="titulo text-5xl">{c.valor}</dd>
              <dd className="mt-1 text-tinta-suave">{c.texto}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Un día de la tienda */}
      <section aria-labelledby="titulo-dia" className="mx-auto max-w-[1200px] px-4 py-12 lg:py-20">
        <h2 id="titulo-dia" className="titulo text-4xl sm:text-5xl">
          {t.dia.titulo}
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-tinta-suave">{t.dia.bajada}</p>
        <ol className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.dia.pasos.map((p) => (
            <li key={p.titulo} className="rounded-[16px] bg-niebla p-5">
              <p className="font-mono text-sm text-pampa">{p.hora}</p>
              <h3 className="mt-1 text-lg font-medium">{p.titulo}</h3>
              <p className="mt-1 text-tinta-suave">{p.detalle}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Las 9 familias */}
      <section id="familias" aria-labelledby="titulo-familias" className="scroll-mt-4 bg-niebla">
        <div className="mx-auto max-w-[1200px] px-4 py-12 lg:py-20">
          <h2 id="titulo-familias" className="titulo text-4xl sm:text-5xl">
            {t.familiasTitulo}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-tinta-suave">{t.familiasBajada}</p>
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {t.familias.map((f) => (
              <li key={f.id} className="rounded-[24px] bg-papel p-6">
                <p className="font-mono text-sm text-pampa">[{f.id}]</p>
                <h3 className="titulo mt-1 text-3xl">{f.nombre}</h3>
                <dl className="mt-3 space-y-3">
                  <div>
                    <dt className="text-sm text-etiqueta">{t.etiquetasFamilia.dispara}</dt>
                    <dd>{f.dispara}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-etiqueta">{t.etiquetasFamilia.hace}</dt>
                    <dd>{f.hace}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-etiqueta">{t.etiquetasFamilia.cuida}</dt>
                    <dd className="text-tinta-suave">{f.cuida}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Discord + la tarjeta de acento (una por página) */}
      <section aria-labelledby="titulo-discord" className="mx-auto grid max-w-[1200px] gap-8 px-4 py-12 lg:grid-cols-[1.3fr_1fr] lg:py-20">
        <div>
          <h2 id="titulo-discord" className="titulo text-4xl sm:text-5xl">
            {t.discord.titulo}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-tinta-suave">{t.discord.bajada}</p>
          <ul className="mt-6 divide-y divide-borde">
            {t.discord.canales.map((c) => (
              <li key={c.nombre} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr]">
                <span className="font-mono font-medium">{c.nombre}</span>
                <span className="text-tinta-suave">{c.llega}</span>
              </li>
            ))}
          </ul>
        </div>
        <aside aria-labelledby="titulo-acento" className="self-start rounded-[24px] bg-yerba-suave p-6 text-monte lg:p-8">
          <h2 id="titulo-acento" className="titulo text-3xl">
            {t.acento.titulo}
          </h2>
          <ol className="mt-5 space-y-4">
            {t.acento.pasos.map((p, i) => (
              <li key={p} className="flex gap-3">
                <span className="titulo text-2xl leading-none">{i + 1}</span>
                <span>{p}</span>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      {/* El diseño de la tienda */}
      <section id="diseno" aria-labelledby="titulo-diseno" className="scroll-mt-4 bg-niebla">
        <div className="mx-auto max-w-[1200px] px-4 py-12 lg:py-20">
          <h2 id="titulo-diseno" className="titulo text-4xl sm:text-5xl">
            {t.diseno.titulo}
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-tinta-suave">{t.diseno.bajada}</p>
          <dl className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {t.diseno.metricas.map((m) => (
              <div key={m.texto} className="rounded-[16px] bg-papel p-5">
                <dt className="sr-only">{m.texto}</dt>
                <dd className="text-3xl font-medium">{m.valor}</dd>
                <dd className="mt-1 text-sm text-tinta-suave">{m.texto}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-tinta-suave">{t.diseno.pendiente}</p>
          <div className="mt-8 grid items-start gap-6 md:grid-cols-[2fr_1fr]">
            <figure>
              <Image src="/tienda-home.jpg" alt={t.diseno.capturaHome} width={1280} height={800} sizes="(min-width: 768px) 66vw, 100vw" className="rounded-[12px]" />
              <figcaption className="mt-2 text-sm text-tinta-suave">{t.diseno.capturaHome}</figcaption>
            </figure>
            <figure className="mx-auto w-full max-w-[280px]">
              <Image src="/tienda-ficha.jpg" alt={t.diseno.capturaFicha} width={780} height={1688} sizes="280px" className="rounded-[12px]" />
              <figcaption className="mt-2 text-sm text-tinta-suave">{t.diseno.capturaFicha}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Tablero de ejecuciones */}
      <section aria-labelledby="titulo-panel" className="mx-auto max-w-[1200px] px-4 py-12 lg:py-20">
        <h2 id="titulo-panel" className="titulo text-4xl sm:text-5xl">
          {t.panel.titulo}
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-tinta-suave">{t.panel.bajada}</p>
        <div className="mt-8 rounded-[24px] bg-niebla p-5 sm:p-8">
          <table className="w-full text-left">
            <caption className="sr-only">{t.panel.bajada}</caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">Workflow</th>
                <th scope="col">{idioma === "en" ? "Executions" : "Ejecuciones"}</th>
              </tr>
            </thead>
            <tbody>
              {EJECUCIONES.map((e) => (
                <tr key={e.workflow} className="grid grid-cols-[1fr_auto] items-center gap-x-4 py-1.5 sm:grid-cols-[18rem_1fr_4rem]">
                  <th scope="row" className="font-mono text-sm font-normal">
                    {e.workflow}
                  </th>
                  <td className="order-3 col-span-2 sm:order-none sm:col-span-1" aria-hidden="true">
                    <div className="h-3 rounded-full bg-pampa" style={{ width: `${Math.max(1.5, (e.ejecuciones / max) * 100)}%` }} />
                  </td>
                  <td className="text-right font-medium">{n(e.ejecuciones)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="mt-3 grid grid-cols-[1fr_auto] border-t border-borde pt-3 sm:grid-cols-[18rem_1fr_4rem]">
                <th scope="row" className="font-medium">
                  {t.panel.total}
                </th>
                <td className="hidden sm:block" />
                <td className="text-right font-medium">{n(total)}</td>
              </tr>
            </tfoot>
          </table>
          <p className="mt-4 text-sm text-tinta-suave">{t.panel.nota}</p>
        </div>
      </section>

      {/* Cómo se trabaja + privacidad */}
      <section id="proceso" aria-labelledby="titulo-proceso" className="scroll-mt-4 bg-niebla">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-12 lg:grid-cols-[1.4fr_1fr] lg:py-20">
          <div>
            <h2 id="titulo-proceso" className="titulo text-4xl sm:text-5xl">
              {t.proceso.titulo}
            </h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {t.proceso.pasos.map((p, i) => (
                <li key={p.titulo} className="rounded-[16px] bg-papel p-5">
                  <p className="font-mono text-sm text-pampa">0{i + 1}</p>
                  <h3 className="mt-1 text-lg font-medium">{p.titulo}</h3>
                  <p className="mt-1 text-tinta-suave">{p.detalle}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="titulo text-3xl">{t.privacidad.titulo}</h2>
            <ul className="mt-5 space-y-3">
              {t.privacidad.puntos.map((p) => (
                <li key={p} className="flex gap-2">
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1 shrink-0 text-ok">
                    <rect x="3" y="7" width="10" height="7" rx="1.5" />
                    <path d="M5 7V5a3 3 0 0 1 6 0v2" />
                  </svg>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section aria-labelledby="titulo-cierre" className="mx-auto max-w-[1200px] px-4 py-16 text-center lg:py-24">
        <h2 id="titulo-cierre" className="titulo-display text-5xl text-balance sm:text-6xl">
          {t.cierre.titulo}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-tinta-suave">{t.cierre.bajada}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={LINKEDIN} className="boton boton-relleno" rel="noopener">
            {t.cierre.linkedin}
          </a>
          <a href={UPWORK} className="boton boton-contorno" rel="noopener">
            {t.cierre.upwork}
          </a>
        </div>
      </section>
    </>
  );
}
