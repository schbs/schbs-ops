// El documento base (html, encabezado y pie) de cada idioma. Lo usan los layouts raíz de (es) y (en).
import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import { textos, type Idioma } from "./textos";
import "../app/globals.css";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument-serif", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

export function metadataDe(idioma: Idioma): Metadata {
  const t = textos(idioma).meta;
  return {
    // En Vercel, la URL de producción sale de la variable de sistema; en local, el puerto 3209.
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ||
        (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3209"),
    ),
    title: t.titulo,
    description: t.descripcion,
    alternates: { canonical: idioma === "en" ? "/en" : "/", languages: { "es-AR": "/", en: "/en" } },
  };
}

export function Documento({ idioma, children }: { idioma: Idioma; children: React.ReactNode }) {
  const t = textos(idioma);
  const base = idioma === "en" ? "/en" : "/";
  return (
    <html lang={t.lang} className={`${serif.variable} ${geist.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <header className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-4">
          <Link href={base} className="titulo inline-flex min-h-11 items-center text-2xl">
            SCHBS Ops
          </Link>
          <nav aria-label={idioma === "en" ? "Main" : "Principal"} className="flex items-center gap-1 sm:gap-5">
            <a href="#familias" className="hidden min-h-11 items-center hover:underline sm:inline-flex">
              {t.nav.familias}
            </a>
            <a href="#diseno" className="hidden min-h-11 items-center hover:underline md:inline-flex">
              {t.nav.diseno}
            </a>
            <a href="#proceso" className="hidden min-h-11 items-center hover:underline md:inline-flex">
              {t.nav.proceso}
            </a>
            <Link href={t.nav.otroHref} lang={t.nav.otroLang} hrefLang={t.nav.otroLang} className="boton boton-contorno">
              {t.nav.otro}
            </Link>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-niebla">
          <div className="mx-auto max-w-[1200px] px-4 py-8 text-sm text-tinta-suave">
            <p>{t.pie}</p>
            <p className="mt-1">{t.autor}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
