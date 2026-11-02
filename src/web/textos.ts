// Textos de la página en español (rioplatense) e inglés (/en). Los datos salen de la documentación interna de la
// tienda (workflows al 30/10/2026, ejecuciones del 8 al 27/10/2026 y la medición de rendimiento de la home).
// Ningún dato de clientes ni de ventas.
export type Idioma = "es" | "en";

export type Familia = { id: string; nombre: string; dispara: string; hace: string; cuida: string };
export type Paso = { hora: string; titulo: string; detalle: string };
export type Canal = { nombre: string; llega: string };
export type Barra = { workflow: string; ejecuciones: number };

const familiasEs: Familia[] = [
  {
    id: "FOTOS",
    nombre: "Fotos de producto con IA",
    dispara: "Un formulario desde el celular: nombre, categoría, precio, defectos y las fotos de la prenda.",
    hace: "Achica cada foto, la pasa por Gemini a 2K para dejarla como foto de estudio, controla el fondo, lo saca con fal.ai, guarda en Drive y manda todo a Discord para aprobar. Al aprobar, crea el producto oculto en Tiendanube con su SKU.",
    cuida: "Las prendas son usadas: la IA no recibe el texto de los defectos para no inventarlos ni moverlos. La foto de la etiqueta nunca pasa por IA. Una carga por vez (turnos) para no quedarse sin memoria.",
  },
  {
    id: "STOCK",
    nombre: "Stock, precios y drops",
    dispara: "Compras cargadas desde Discord (foto + \"prenda · tipo · precio\"), el formulario de drops y las ventas pagadas.",
    hace: "Planilla con SKU por prenda y estados (comprado → oculto → publicado → vendido). Un solo workflow calcula precios y uno solo publica u oculta en la tienda. Registra cada venta y arma el reporte de los lunes.",
    cuida: "Nunca re-sube la planilla entera, saltea las ventas ya anotadas y reintenta cuando Google limita las escrituras.",
  },
  {
    id: "DROP",
    nombre: "Anuncio del drop",
    dispara: "A mano, cuando sale un drop.",
    hace: "Arma los mensajes para el grupo de WhatsApp a partir de la categoría del último drop.",
    cuida: "No manda nada solo: deja el texto listo para revisar.",
  },
  {
    id: "VENTAS",
    nombre: "Carritos y pagos pendientes",
    dispara: "Cada 3 horas revisa carritos abandonados y pedidos sin pagar.",
    hace: "Mail de recordatorio (24 a 48 h) a quien aceptó marketing, link para pagar el pedido a las 20 h y aviso a Discord con el mensaje de WhatsApp listo para mandar.",
    cuida: "Un aviso por pedido, uno por persona cada 7 días, y solo si la prenda sigue disponible.",
  },
  {
    id: "POSTVENTA",
    nombre: "Reseñas con cupón",
    dispara: "Todos los días: pedidos despachados hace 7 días hábiles o retirados en el local.",
    hace: "Pide la reseña por mail; quien la deja recibe un cupón único del 10 % y la reseña llega a Discord para aprobar.",
    cuida: "Links firmados, un solo recordatorio y baja con un clic.",
  },
  {
    id: "MAILS",
    nombre: "Campañas a clientes",
    dispara: "Campañas programadas en la planilla.",
    hace: "Actualiza la lista de compradores, espera la hora de cada campaña y la manda por la API de Gmail en tandas.",
    cuida: "Nunca dos veces la misma campaña a la misma persona, respeta las bajas y tiene modos simulacro, prueba y real.",
  },
  {
    id: "SALE",
    nombre: "Programador del sale",
    dispara: "Seis momentos por día durante el sale.",
    hace: "Al empezar pausa los cupones que no se combinan, avisa 48 h antes y el último día, y al cerrar los reactiva y manda un resumen.",
    cuida: "Cada momento se hace una sola vez (queda anotado) y se probó en simulacro antes de pasar a real.",
  },
  {
    id: "CONTENIDO",
    nombre: "Ideas de contenido",
    dispara: "El disparo diario de las 9:00 y los lunes.",
    hace: "Todos los días elige 3 prendas para historias y Claude escribe el texto; los lunes, 7 ideas de video con guion.",
    cuida: "Claude no recibe precios ni el stock completo, no repite prendas en 7 días y un validador revisa cada idea.",
  },
  {
    id: "SISTEMA",
    nombre: "Orden y cupo",
    dispara: "Una sola ejecución por día, a las 9:00.",
    hace: "Llama al contenido, las reseñas, el contador de ejecuciones y, los lunes, al reporte. Cuenta cuántas ejecuciones usó cada workflow.",
    cuida: "El plan de n8n tiene 2.500 ejecuciones por mes: el reporte avisa cuánto va y qué flujo gastó más.",
  },
];

const familiasEn: Familia[] = [
  {
    id: "FOTOS",
    nombre: "AI product photos",
    dispara: "A phone form: name, category, price, flaws and the garment photos.",
    hace: "Resizes each photo, runs it through Gemini at 2K to make it a studio shot, checks the background, removes it with fal.ai, saves to Drive and posts everything to Discord for approval. On approval it creates the hidden product in Tiendanube with its SKU.",
    cuida: "The garments are used: the AI never gets the flaw notes, so it can't invent or move them. The label photo never goes through AI. One upload at a time (a queue) to stay within memory.",
  },
  {
    id: "STOCK",
    nombre: "Stock, pricing and drops",
    dispara: "Purchases logged from Discord (photo + \"item · type · price\"), the drops form and paid orders.",
    hace: "A sheet with one SKU per item and states (bought → hidden → published → sold). A single workflow computes prices and a single one publishes or hides products. It records every sale and builds the Monday report.",
    cuida: "Never re-uploads the whole sheet, skips sales already recorded and retries when Google throttles writes.",
  },
  {
    id: "DROP",
    nombre: "Drop announcement",
    dispara: "By hand, when a drop goes live.",
    hace: "Builds the messages for the WhatsApp group from the latest-drop category.",
    cuida: "Sends nothing by itself: leaves the text ready to review.",
  },
  {
    id: "VENTAS",
    nombre: "Carts and unpaid orders",
    dispara: "Every 3 hours it checks abandoned carts and unpaid orders.",
    hace: "Reminder email (24–48 h) to opted-in shoppers, a pay-this-order link at 20 h, and a Discord alert with the WhatsApp message ready to send.",
    cuida: "One alert per order, one per person every 7 days, and only if the item is still available.",
  },
  {
    id: "POSTVENTA",
    nombre: "Reviews with a coupon",
    dispara: "Daily: orders shipped 7 business days ago or picked up in store.",
    hace: "Asks for a review by email; reviewers get a unique 10% coupon and the review lands in Discord for approval.",
    cuida: "Signed links, a single reminder and one-click unsubscribe.",
  },
  {
    id: "MAILS",
    nombre: "Customer campaigns",
    dispara: "Campaigns scheduled in the sheet.",
    hace: "Refreshes the buyer list, waits for each campaign's time and sends it through the Gmail API in batches.",
    cuida: "Never the same campaign twice to the same person, honors unsubscribes, and has dry-run, test and live modes.",
  },
  {
    id: "SALE",
    nombre: "Sale scheduler",
    dispara: "Six moments a day during a sale.",
    hace: "At the start it pauses coupons that don't stack, sends 48-hour and last-day notices, and at the end reactivates them and posts a summary.",
    cuida: "Each moment runs once (it's logged) and it was tested in dry-run before going live.",
  },
  {
    id: "CONTENIDO",
    nombre: "Content ideas",
    dispara: "The 9:00 daily run and Mondays.",
    hace: "Every day it picks 3 items for stories and Claude writes the copy; on Mondays, 7 video ideas with scripts.",
    cuida: "Claude never gets prices or the full stock, items don't repeat within 7 days and a validator checks every idea.",
  },
  {
    id: "SISTEMA",
    nombre: "Order and quota",
    dispara: "A single run a day, at 9:00.",
    hace: "Calls content, reviews, the execution counter and, on Mondays, the report. Counts how many executions each workflow used.",
    cuida: "The n8n plan has 2,500 executions a month: the report shows how much is used and which flow spent the most.",
  },
];

// Ejecuciones que cuentan para el cupo de n8n, del 8 al 27/10/2026 (contadas con la API de n8n, solo lectura).
// Solo los workflows de SCHBS (se excluyen los de otros proyectos de la misma cuenta).
export const EJECUCIONES: Barra[] = [
  { workflow: "[SALE] Programador", ejecuciones: 482 },
  { workflow: "[MAILS] Campañas a clientes", ejecuciones: 284 },
  { workflow: "[VENTAS] Recordatorio de carrito", ejecuciones: 115 },
  { workflow: "[FOTOS] Ocultar vendidos", ejecuciones: 95 },
  { workflow: "[FOTOS] Aviso de canceladas", ejecuciones: 92 },
  { workflow: "[FOTOS] Ingreso de prenda", ejecuciones: 22 },
  { workflow: "[POSTVENTA] Links de los mails", ejecuciones: 20 },
  { workflow: "[STOCK] Compras desde Discord", ejecuciones: 7 },
  { workflow: "[MAILS] Link de baja", ejecuciones: 6 },
  { workflow: "[POSTVENTA] Recibir reseña", ejecuciones: 4 },
  { workflow: "[POSTVENTA] Pedido de reseña", ejecuciones: 4 },
  { workflow: "[SISTEMA] Diario 9:00", ejecuciones: 3 },
];

const es = {
  lang: "es-AR",
  meta: {
    titulo: "SCHBS Ops · La operación de una tienda real, automatizada",
    descripcion:
      "Caso real: cómo se opera schbscorp.com, una tienda de ropa usada de prendas únicas, con 33 workflows de n8n, Discord como centro de control, IA para fotos y contenido, y un diseño web propio.",
  },
  nav: { familias: "Automatizaciones", diseno: "Diseño", proceso: "Cómo se trabaja", otro: "English", otroHref: "/en", otroLang: "en" },
  hero: {
    kicker: "Caso real · mi propia tienda",
    titulo: ["La operación de una tienda", "que se arma sola."],
    bajada:
      "SCHBS vende ropa usada de prendas únicas, por drops. De la foto del celular a la venta, la operación corre en n8n y se controla desde Discord: fotos de producto con IA, stock, precios, carritos, reseñas, mails y reportes.",
    cta: "Ver las automatizaciones",
    cta2: "Visitar la tienda",
    aviso: "Las piezas de esta página son ejemplos: no muestran clientes, pedidos ni montos reales.",
  },
  piezas: {
    foto: { titulo: "Foto de producto", de: "Celular", a: "Tienda", estado: "Fondo listo · 2K" },
    discord: { canal: "#aprobaciones", texto: "Remera manga larga · T. L lista para revisar", botones: ["Aprobar", "Cambiar precio", "Modificar", "Rechazar"] },
    aviso: { titulo: "Pago pendiente · 20 h", texto: "Mensaje de WhatsApp listo para mandar", estado: "Mail de recordatorio enviado" },
    reporte: { titulo: "Reporte de los lunes", linea: "Ejecuciones de n8n este mes", cupo: "de 2.500" },
    ejemplo: "Ejemplo",
  },
  cifras: [
    { valor: "33", texto: "workflows de n8n (29 en producción)" },
    { valor: "9", texto: "familias, cada una con su prefijo" },
    { valor: "290", texto: "commits en octubre de 2026" },
    { valor: "1", texto: "disparo por día para cuidar el cupo" },
  ],
  dia: {
    titulo: "Un día de la tienda",
    bajada: "Lo que pasa solo, en orden. Lo que necesita una decisión llega a Discord con botones.",
    pasos: [
      { hora: "6:00", titulo: "Lista de mails al día", detalle: "Actualiza compradores y bajas; prepara las campañas de hoy." },
      { hora: "9:00", titulo: "Disparo diario", detalle: "Ideas para historias, pedidos de reseña, contador de ejecuciones y, los lunes, el reporte." },
      { hora: "9 a 21", titulo: "Compras desde Discord", detalle: "Cada compra con su foto entra a la planilla con SKU y precio sugerido." },
      { hora: "Cuando cargo", titulo: "Prenda nueva", detalle: "Formulario → fotos con IA → Discord → producto oculto en la tienda." },
      { hora: "Cada 3 h", titulo: "Carritos y pagos", detalle: "Recordatorios por mail y avisos de WhatsApp listos para mandar." },
      { hora: "Al pagar", titulo: "Venta registrada", detalle: "Tiendanube avisa, la venta se anota y la prenda queda como vendida." },
      { hora: "Drop", titulo: "Publicación", detalle: "Publica o esconde el drop desde un formulario, con lista y confirmación." },
    ] as Paso[],
  },
  familiasTitulo: "Las 9 familias de workflows",
  familiasBajada: "Cada una con un prefijo en n8n, su generador en Python y sus pruebas locales.",
  etiquetasFamilia: { dispara: "Se dispara", hace: "Qué hace", cuida: "Qué cuida" },
  familias: familiasEs,
  discord: {
    titulo: "Discord como centro de control",
    bajada:
      "Un bot conectado a n8n. Todo lo que necesita una persona llega a un canal, con botones que vuelven al workflow.",
    canales: [
      { nombre: "#aprobaciones", llega: "Fotos procesadas con Aprobar, Aprobar y publicar, Cambiar precio, Modificar o Rechazar. Alertas de stock." },
      { nombre: "#compras", llega: "Cada compra con su foto; el bot responde con el SKU, el costo y el precio sugerido." },
      { nombre: "#drops", llega: "Lo que se publicó o se escondió en cada drop." },
      { nombre: "#reportes", llega: "El reporte de los lunes, el resumen del sale y las campañas enviadas." },
      { nombre: "Avisos de WhatsApp", llega: "Avisos de carritos y pagos con el link wa.me y botones Enviado · No mandar · Compró." },
      { nombre: "Contenido", llega: "Las 3 prendas del día para historias y las ideas de video de la semana." },
    ] as Canal[],
  },
  acento: {
    titulo: "Qué pasa cuando entra una prenda",
    pasos: [
      "Subo las fotos desde el celular, con los defectos anotados.",
      "La IA las deja como fotos de estudio sin tocar los defectos.",
      "Llegan a Discord: apruebo, cambio el precio o pido otra versión.",
      "Se crea el producto oculto con su SKU y queda para el próximo drop.",
    ],
  },
  diseno: {
    titulo: "El diseño de la tienda",
    bajada:
      "El tema de Tiendanube es propio: rediseño de la home, la ficha y el carrito, CSS crítico y carga diferida. Medido en la home con Lighthouse en celular (mediana de 3, antes y después):",
    metricas: [
      { valor: "0,91 → 0", texto: "CLS: la página dejó de moverse al cargar" },
      { valor: "414 → 13 ms", texto: "TBT: el celular responde enseguida" },
      { valor: "−33 %", texto: "peso total de la home" },
      { valor: "−38 %", texto: "JavaScript" },
    ],
    pendiente: "Lo que falta: el LCP de las fotos grandes, que sigue siendo el pendiente de rendimiento.",
    capturaHome: "Home de schbscorp.com",
    capturaFicha: "Listado de productos en el celular",
  },
  panel: {
    titulo: "Dónde se van las ejecuciones",
    bajada: "Ejecuciones que cuentan para el cupo de n8n, del 8 al 27 de octubre de 2026.",
    nota: "El programador del sale corría cada 5 minutos; desde el 23/10 corre 6 veces por día. Los flujos de la mañana se juntaron en un solo disparo diario.",
    total: "Total",
  },
  proceso: {
    titulo: "Cómo se trabaja",
    pasos: [
      { titulo: "Generadores, no clics", detalle: "Cada workflow se escribe con un script de Python que genera el JSON. Así se versiona y se revisa." },
      { titulo: "Backup y commit antes de subir", detalle: "El script de subida frena si el cambio no está commiteado; cada cambio se puede volver atrás." },
      { titulo: "Simulacro, prueba y real", detalle: "Los flujos que escriben a clientes arrancan en simulacro, después prueban con mi casilla y recién después pasan a real." },
      { titulo: "Pruebas locales", detalle: "La lógica de los nodos de código se prueba con node antes de subirla, con casos guardados de corridas reales." },
    ],
  },
  privacidad: {
    titulo: "Seguridad y privacidad",
    puntos: [
      "Token de lectura para leer la tienda; el de escritura solo en los nodos que escriben.",
      "Credenciales por nombre: ningún archivo ni workflow tiene claves.",
      "Nunca pedidos de prueba con prendas reales: hay un producto oculto para eso.",
      "Esta página no muestra datos de clientes, pedidos ni montos.",
    ],
  },
  cierre: {
    titulo: "¿Tu tienda necesita algo así?",
    bajada: "Lo mismo se puede armar para Tiendanube o Shopify, con n8n y la IA que convenga.",
    linkedin: "Escribime en LinkedIn",
    upwork: "Perfil de Upwork",
  },
  pie: "Caso real de la tienda propia de Germán Schouabs. Los ejemplos de la página no son datos reales.",
  autor: "Desarrollado por Germán Schouabs.",
};

type Textos = typeof es;

const en: Textos = {
  lang: "en",
  meta: {
    titulo: "SCHBS Ops · A real store's operation, automated",
    descripcion:
      "Case study: how schbscorp.com, a one-of-a-kind secondhand clothing store, runs on 33 n8n workflows, a Discord control center, AI for photos and content, and a custom storefront design.",
  },
  nav: { familias: "Automations", diseno: "Design", proceso: "How it's built", otro: "Español", otroHref: "/", otroLang: "es" },
  hero: {
    kicker: "Real case · my own store",
    titulo: ["A store's operation", "that runs itself."],
    bajada:
      "SCHBS sells one-of-a-kind secondhand clothing in drops. From the phone photo to the sale, operations run on n8n and are controlled from Discord: AI product photos, stock, pricing, carts, reviews, emails and reports.",
    cta: "See the automations",
    cta2: "Visit the store",
    aviso: "The pieces on this page are examples: no real customers, orders or amounts.",
  },
  piezas: {
    foto: { titulo: "Product photo", de: "Phone", a: "Store", estado: "Background ready · 2K" },
    discord: { canal: "#approvals", texto: "Long-sleeve tee · L ready for review", botones: ["Approve", "Change price", "Edit", "Reject"] },
    aviso: { titulo: "Unpaid order · 20 h", texto: "WhatsApp message ready to send", estado: "Reminder email sent" },
    reporte: { titulo: "Monday report", linea: "n8n executions this month", cupo: "of 2,500" },
    ejemplo: "Example",
  },
  cifras: [
    { valor: "33", texto: "n8n workflows (29 in production)" },
    { valor: "9", texto: "families, each with its own prefix" },
    { valor: "290", texto: "commits in October 2026" },
    { valor: "1", texto: "trigger a day to protect the quota" },
  ],
  dia: {
    titulo: "A day at the store",
    bajada: "What happens on its own, in order. Anything that needs a decision lands in Discord with buttons.",
    pasos: [
      { hora: "6:00", titulo: "Email list refreshed", detalle: "Updates buyers and unsubscribes; prepares today's campaigns." },
      { hora: "9:00", titulo: "Daily run", detalle: "Story ideas, review requests, the execution counter and, on Mondays, the report." },
      { hora: "9 to 21", titulo: "Purchases from Discord", detalle: "Each purchase with its photo goes into the sheet with a SKU and a suggested price." },
      { hora: "On upload", titulo: "New item", detalle: "Form → AI photos → Discord → hidden product in the store." },
      { hora: "Every 3 h", titulo: "Carts and payments", detalle: "Email reminders and WhatsApp alerts ready to send." },
      { hora: "On payment", titulo: "Sale recorded", detalle: "Tiendanube notifies, the sale is logged and the item is marked sold." },
      { hora: "Drop", titulo: "Publishing", detalle: "Publishes or hides the drop from a form, with a list and a confirmation." },
    ],
  },
  familiasTitulo: "The 9 workflow families",
  familiasBajada: "Each with its own n8n prefix, a Python generator and local tests.",
  etiquetasFamilia: { dispara: "Trigger", hace: "What it does", cuida: "What it protects" },
  familias: familiasEn,
  discord: {
    titulo: "Discord as the control center",
    bajada: "A bot connected to n8n. Anything that needs a person lands in a channel, with buttons that go back to the workflow.",
    canales: [
      { nombre: "#approvals", llega: "Processed photos with Approve, Approve and publish, Change price, Edit or Reject. Stock alerts." },
      { nombre: "#purchases", llega: "Each purchase with its photo; the bot replies with the SKU, the cost and a suggested price." },
      { nombre: "#drops", llega: "What was published or hidden in each drop." },
      { nombre: "#reports", llega: "The Monday report, the sale summary and the campaigns sent." },
      { nombre: "WhatsApp alerts", llega: "Cart and payment alerts with the wa.me link and Sent · Don't send · Bought buttons." },
      { nombre: "Content", llega: "The 3 items of the day for stories and the week's video ideas." },
    ],
  },
  acento: {
    titulo: "What happens when an item comes in",
    pasos: [
      "I upload the photos from my phone, with the flaws noted.",
      "The AI turns them into studio shots without touching the flaws.",
      "They land in Discord: I approve, change the price or ask for another version.",
      "The hidden product is created with its SKU, ready for the next drop.",
    ],
  },
  diseno: {
    titulo: "The storefront design",
    bajada:
      "The Tiendanube theme is custom: redesigned home, product page and cart, critical CSS and deferred loading. Measured on the home page with mobile Lighthouse (median of 3, before and after):",
    metricas: [
      { valor: "0.91 → 0", texto: "CLS: the page no longer shifts while loading" },
      { valor: "414 → 13 ms", texto: "TBT: the phone responds right away" },
      { valor: "−33%", texto: "total home page weight" },
      { valor: "−38%", texto: "JavaScript" },
    ],
    pendiente: "Still to do: LCP on the large photos remains the open performance item.",
    capturaHome: "schbscorp.com home page",
    capturaFicha: "Product listing on a phone",
  },
  panel: {
    titulo: "Where the executions go",
    bajada: "Executions that count toward the n8n quota, October 8–27, 2026.",
    nota: "The sale scheduler used to run every 5 minutes; since Oct 23 it runs 6 times a day. The morning flows were merged into a single daily run.",
    total: "Total",
  },
  proceso: {
    titulo: "How it's built",
    pasos: [
      { titulo: "Generators, not clicks", detalle: "Each workflow is written by a Python script that outputs the JSON, so it's versioned and reviewable." },
      { titulo: "Backup and commit before upload", detalle: "The upload script stops if the change isn't committed; every change can be rolled back." },
      { titulo: "Dry run, test and live", detalle: "Flows that email customers start in dry run, then test against my own inbox, and only then go live." },
      { titulo: "Local tests", detalle: "Code-node logic is tested with node before upload, using cases saved from real runs." },
    ],
  },
  privacidad: {
    titulo: "Security and privacy",
    puntos: [
      "A read-only token to read the store; the write token only in the nodes that write.",
      "Credentials by name: no file or workflow contains keys.",
      "Never test orders with real items: there's a hidden product for that.",
      "This page shows no customer data, orders or amounts.",
    ],
  },
  cierre: {
    titulo: "Does your store need something like this?",
    bajada: "The same can be built for Tiendanube or Shopify, with n8n and whichever AI fits.",
    linkedin: "Message me on LinkedIn",
    upwork: "Upwork profile",
  },
  pie: "Real case from Germán Schouabs's own store. The examples on this page are not real data.",
  autor: "Developed by Germán Schouabs.",
};

export const textos = (idioma: Idioma): Textos => (idioma === "en" ? en : es);
export type { Textos };
