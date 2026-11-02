# Identidad visual: SCHBS Ops

La fuente de verdad del diseño es **[`docs/DESIGN.md`](DESIGN.md)**: basado
en **Steep** de Refero Styles y adaptado, elegido por Germán el 02/11/2026 entre tres opciones (Assembly Coffee London,
Maëlan Le Meur y Steep). Los tokens del proyecto (`@theme` de Tailwind en `src/app/globals.css`) salen de ese archivo;
cualquier cambio de diseño se hace primero ahí.

Resumen:
- **Tipografías:** Instrument Serif (títulos, siempre 400) + Geist (interfaz y datos).
- **Color:** papel y niebla casi acromáticos; primario azul pampa `oklch(0.45 0.1 245)`; acento yerba suave
  `oklch(0.92 0.07 125)` con verde monte `oklch(0.36 0.07 140)`. Contraste AA en los 16 pares (`npm run contraste`).
- **Layout:** página de caso editorial; título serif centrado con 4 piezas flotantes de la operación (foto de
  producto, Discord, aviso de pago, reporte), un día de la tienda, las 9 familias, Discord, diseño de la tienda y un
  tablero de ejecuciones.
- **Gesto:** el hilo que une las piezas, el recorrido de una prenda de la foto a la venta.
- **Movimiento:** las piezas entran una vez (desplazamiento + opacidad) y el hilo se revela; nada con movimiento
  reducido.
