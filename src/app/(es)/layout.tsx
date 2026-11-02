import type { Metadata } from "next";
import { Documento, metadataDe } from "@/web/Documento";

export const metadata: Metadata = metadataDe("es");

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <Documento idioma="es">{children}</Documento>;
}
