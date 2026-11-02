# DESIGN.md · SCHBS Ops (caso real: la operación automatizada de schbscorp.com, portfolio P9)

Basado en **Steep** de Refero Styles (https://styles.refero.design/style/75fdb89f-ca64-41b3-af36-7a78bd09448e),
adaptado a SCHBS Ops.

> Elegido por Germán el 02/11/2026 ("OK opción 3", entre Assembly Coffee London, Maëlan Le Meur y Steep), primero para
> "Cebador" (tienda ficticia de mates). El mismo día Germán cambió el proyecto P9: en lugar de una tienda de Shopify
> inventada, se muestra la operación real de su tienda **schbscorp.com** y pidió mantener esta plantilla. Fuente: MCP de
> Refero (`@darcas/refero-design-mcp` 1.4.0). Su resumen está en `docs/brand.md`. Todo lo de diseño sale de acá: primero se cambia este archivo y después el código.

## 1. Brief
- **Qué es:** una página de caso que muestra cómo funciona la operación de **SCHBS** (schbscorp.com, reventa de ropa
  Y2K/streetwear de prendas únicas, por drops, en Tiendanube): 27 workflows de n8n en 9 familias, Discord como centro de
  control, IA para fotos y contenido, planilla de stock, mails y avisos, y el diseño propio de la tienda.
- **Qué se diseña:** la página (ES en `/`, EN en `/en`), con un tablero de ejecuciones por workflow.
- **Público:** dueños de tiendas online (Tiendanube, Shopify) y clientes de Upwork/Workana que buscan automatizaciones
  de e-commerce con n8n e IA.
- **3 adjetivos:** ordenado, real, artesanal.
- **Marca:** la página es de Germán (caso de estudio); la marca SCHBS aparece en las capturas de la tienda, no en la
  interfaz de la página.
- **Privacidad:** ningún dato de clientes, pedidos, montos, costos ni IDs; los ejemplos van marcados como ejemplo. Solo
  cifras operativas (ejecuciones, workflows, rendimiento web).
- **Conversión:** que el visitante entienda en una pantalla qué hace el sistema y escriba.

## 2. Qué se tomó y qué se cambió

| Se toma de Steep | Se cambia a SCHBS Ops | No se copia |
|---|---|---|
| Página editorial blanca, contenedor de 1200 px, secciones de 80 px que alternan papel y niebla | Display: Signifier → **Instrument Serif**; texto: Söhne → **Geist** | Logo, nombre, textos, la combinación Signifier + Söhne + durazno |
| Hero con un título serif enorme y centrado, rodeado de **tarjetas flotantes con piezas reales del sistema** | Acento: durazno/siena → **yerba suave / verde monte**; primario de marca: **azul pampa** para links, foco y datos | Las piezas de producto de Steep (tablas de regiones, composer de IA) |
| Botones en píldora (relleno + contorno en par), tarjetas de 24 px sin sombra, solo las flotantes tienen elevación | Las piezas flotantes son de la operación real (foto de producto, Discord, aviso de pago, reporte) | |
| Serif siempre en peso 400 con tracking negativo; sans con pesos intermedios | Gesto propio: **el hilo** que conecta las piezas flotantes (el recorrido de una prenda, de la foto a la venta) | |
| Tarjeta de métrica con un gráfico de línea gestual, sin ejes | Tono: rioplatense en la versión ES, directo en EN | |

## 3. Color

| Token | OKLCH | Rol |
|---|---|---|
| `papel` | `oklch(0.99 0.003 100)` | Fondo de página y tarjetas flotantes |
| `niebla` | `oklch(0.965 0.004 120)` | Secciones alternas y tarjetas neutras |
| `tinta` | `oklch(0.22 0.015 160)` | Títulos, texto, botón relleno (texto `papel` encima) |
| `tinta-suave` | `oklch(0.48 0.012 160)` | Texto secundario y metadatos |
| `etiqueta` | `oklch(0.55 0.01 160)` | Rótulos tipográficos (tags sin caja), 14 px como mínimo |
| `pampa` | `oklch(0.45 0.1 245)` | **Primario de marca:** links con flecha, foco, series de datos del panel |
| `yerba-suave` | `oklch(0.92 0.07 125)` | Tarjeta de acento (una por página) y resaltado de estados |
| `monte` | `oklch(0.36 0.07 140)` | Texto y trazos sobre `yerba-suave`; línea de los gráficos |
| `alerta` | `oklch(0.5 0.17 28)` | Stock bajo y errores (siempre con ícono y texto) |
| `ok` | `oklch(0.45 0.1 150)` | Estados correctos (siempre con ícono y texto) |
| `foco` | `pampa` | Anillo de 2 px separado 2 px |

El sistema sigue siendo casi acromático: `pampa` y el par `yerba-suave`/`monte` son los únicos colores, y aparecen
poco.

### Pares de contraste (calculados desde OKLCH)

| Par | Contraste | Uso | Estado |
|---|---|---|---|
| tinta sobre papel | 16,75:1 | texto | OK |
| tinta sobre niebla | 15,59:1 | texto | OK |
| tinta-suave sobre papel | 6,31:1 | texto | OK |
| tinta-suave sobre niebla | 5,87:1 | texto | OK |
| etiqueta sobre papel | 4,69:1 | texto 14 px | OK |
| pampa sobre papel | 7,18:1 | links y datos | OK |
| pampa sobre niebla | 6,68:1 | links y datos | OK |
| papel sobre tinta | 16,75:1 | botón relleno | OK |
| monte sobre yerba-suave | 8,48:1 | tarjeta de acento | OK |
| tinta sobre yerba-suave | 13,83:1 | resaltado | OK |
| alerta sobre papel | 6,36:1 | alertas | OK |
| ok sobre papel | 6,90:1 | estados | OK |
| pampa sobre papel / niebla | 7,18 / 6,68:1 | foco (mín. 3) | OK |
| monte sobre papel | 10,28:1 | línea de gráfico (mín. 3) | OK |

## 4. Tipografía
- **Instrument Serif** (Google Fonts, `next/font`): display y títulos, **siempre peso 400**, con itálica para una o dos
  palabras por título. Tracking −0,025 em en el display, −0,015 em en títulos.
- **Geist** (Google Fonts): interfaz, cuerpo, botones, tablas y números del panel (cifras tabulares).

| Rol | Tamaño (móvil → escritorio) | Familia | Peso | Interlineado |
|---|---|---|---|---|
| display | 48 → 88 px | Instrument Serif | 400 | 1,05 |
| heading-lg | 40 → 64 px | Instrument Serif | 400 | 1,1 |
| heading | 32 → 44 px | Instrument Serif | 400 | 1,15 |
| heading-sm | 22 → 26 px | Geist | 500 | 1,2 |
| métrica | 28 → 36 px | Geist | 500 | 1,0 |
| body-lg | 18 → 20 px | Geist | 400 | 1,4 |
| body | 16 → 17 px | Geist | 400 | 1,45 |
| etiqueta / caption | 14 → 15 px | Geist | 400 | 1,4 |

## 5. Espaciado y grilla
- Base 4 px: 4/8/12/16/20/24 en componentes; 80 px entre secciones (48 px en celular).
- Contenedor de 1200 px con 16 px de margen en celular. Mobile-first: a 390 px el hero apila el título y debajo las
  4 piezas flotantes en una columna (sin superposición); desde `lg` flotan alrededor del título.
- Panel `/ops`: grilla de 12 columnas; métricas en 4 tarjetas, gráfico de pedidos por día a 8 columnas, alertas a 4.

## 6. Radios, bordes y sombras
- Radios: 24 px tarjetas, 20 px piezas flotantes, 16 px tarjetas chicas e inputs, 12 px imágenes, 9999 px botones y
  chips.
- Sin bordes en tarjetas (las separa el color de fondo). Inputs con borde de 1 px `niebla` más oscuro.
- Sombra **solo** en las piezas flotantes: anillo de 1 px de tinta al 5 % + `0 20px 25px -5px` y `0 8px 10px -6px`
  de tinta al 10 %.

## 7. Componentes
- **Encabezado:** barra transparente, sin borde. Marca "SCHBS Ops" en Instrument Serif a la izquierda; links y el par de
  botones a la derecha.
- **Botón relleno:** píldora `tinta` con texto `papel`, Geist 16 px, alto mínimo 44 px, 20 px de relleno lateral.
- **Botón contorno:** píldora transparente, borde 1 px `tinta`. Va siempre en par con el relleno.
- **Link con flecha:** texto `pampa` con "→" al final; subrayado solo en hover.
- **Tarjeta neutra:** `niebla`, 24 px, sin sombra.
- **Tarjeta de acento:** `yerba-suave` con texto `monte`, una por página como máximo (en la landing: "Qué pasa cuando
  entra un pedido").
- **Piezas flotantes del hero** (ejemplos, marcados como tales; sin datos reales):
  1. *Foto de celular → foto de producto* (la prenda cargada por formulario, procesada con IA).
  2. *Mensaje de Discord* en #aprobaciones con los botones Aprobar · Cambiar precio · Modificar · Rechazar.
  3. *Aviso de pago pendiente* listo para mandar por WhatsApp (link wa.me) y el mail de recordatorio.
  4. *Reporte de los lunes* con una línea de actividad y "ejecuciones de n8n: X de 2.500".
- **Tarjeta de métrica (panel):** número en Geist 500, variación en `tinta-suave` 14 px y una línea gestual `monte`
  sin ejes.
- **Tabla del panel:** filas con regla de 1 px, cifras tabulares, estado como chip (ícono + texto).
- **Etiqueta:** texto `etiqueta` sin caja (agrupa sin peso visual).

## 8. Movimiento
- **Piezas flotantes:** entran una vez al cargar (desplazamiento de 16 px + `opacity`, 500 ms,
  `cubic-bezier(0.2, 0.8, 0.2, 1)`, escalonadas cada 120 ms) y después quedan quietas. Nunca en el título (LCP).
- **El hilo:** un trazo SVG que une las 4 piezas; se revela con `scaleX`/`opacity` (no se anima el
  `stroke-dashoffset`), una sola vez.
- **Panel:** al cambiar el período, los números cambian sin animación; las barras/las líneas aparecen con `opacity`.
- **Movimiento reducido:** todo visible y quieto de entrada.

## 9. Imágenes
- Producto antes que estilo de vida: las "imágenes" son piezas de interfaz del propio sistema.
- Fotos de producto solo en las fichas de la tienda de demostración (generadas o propias, nunca de terceros ni con
  marcas reales).

## 10. Tono de los textos
Concreto y medido: qué pasa cuando entra un pedido, cuánto tarda, qué se evita ("ningún mail sale dos veces").
Siempre aclara que es la operación real de la tienda propia de Germán y que los ejemplos no son datos reales. En español rioplatense en `/` y en inglés en `/en` (para Upwork).

## 11. Do / Don't
**Do**
- Instrument Serif en peso 400 para todos los títulos; Geist para todo lo demás.
- Píldoras para botones (en par relleno + contorno) y 24 px para tarjetas.
- Una sola tarjeta `yerba-suave` por página.
- Estados con ícono + texto.

**Don't**
- Negritas en la serif.
- Sombras en tarjetas que no flotan.
- Más colores además de `pampa`, `yerba-suave`/`monte`, `alerta` y `ok`.
- Radios menores a 16 px en tarjetas.
- Gradientes, glassmorphism, emojis como íconos.

## 12. Control de diferencia

### (a) Contra el registro visual (`taller/registro-visual.json`, 10 proyectos)
SCHBS Ops: Instrument Serif · 245° · título serif centrado con 4 piezas flotantes del sistema + panel de métricas ·
piezas que entran una vez y el hilo que se revela · tarjetas de 24 px sin borde, píldoras, sombra solo en lo que flota.

| Proyecto | Display | Tono | Layout | Movimiento | Forma | Difiere |
|---|---|---|---|---|---|---|
| Red Inmobiliaria (Montserrat, 25°) | ✓ | ✓ 140° | ✓ | ✗ aparición de bloques | ✓ | 4/5 |
| Rey Automotor (Montserrat, 275°) | ✓ | ✓ 30° | ✓ | ✗ aparición de bloques | ✓ | 4/5 |
| TurnoListo (Lexend, 188°) | ✓ | ✓ 57° | ✓ | ✓ | ✗ radios grandes | 4/5 |
| Embudo (Space Grotesk, 150°) | ✓ | ✓ 95° | ✓ | ✓ | ✓ | 5/5 |
| Fojas (Newsreader, 235°) | ✓ | ✗ 10° | ✓ | ✓ | ✓ | 4/5 |
| Radar (Martian Mono, 260°) | ✓ | ✗ 15° | ✓ | ✓ | ✓ | 4/5 |
| Remito (Barlow Condensed, 110°) | ✓ | ✓ 135° | ✓ | ✓ | ✓ | 5/5 |
| Ficha (Bricolage Grotesque, 12°) | ✓ | ✓ 127° | ✓ | ✓ | ✓ | 5/5 |
| Atiende (Big Shoulders, 48°) | ✓ | ✓ 163° | ✓ | ✓ | ✓ | 5/5 |
| Mostrador MCP (Archivo Black, 350°) | ✓ | ✓ 105° | ✓ | ✓ | ✓ | 5/5 |

Todos ≥ 3/5: **pasa**. Ojo: Fojas también es serif editorial (Newsreader); se separan por layout (columna de lectura
contra hero con piezas flotantes) y forma (sin radios contra 24 px y píldoras).

### (b) Contra el estilo de origen (Steep)

| Eje | Steep | SCHBS Ops | Distinto |
|---|---|---|---|
| Display | Signifier | Instrument Serif | ✓ |
| Texto | Söhne | Geist | ✓ |
| Color | casi acromático + durazno `#fbe1d1` / siena `#5d2a1a` | azul pampa `oklch(0.45 0.1 245)` + yerba suave / verde monte | ✓ |
| Piezas del hero | tablas de regiones, composer de IA | foto de producto, Discord, aviso de pago, reporte | ✓ |
| Logo, textos | — | propios | ✓ |

**Pasa.**
