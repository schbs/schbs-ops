import type { Metadata } from "next";
import { Documento, metadataDe } from "@/web/Documento";

export const metadata: Metadata = metadataDe("en");

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <Documento idioma="en">{children}</Documento>;
}
