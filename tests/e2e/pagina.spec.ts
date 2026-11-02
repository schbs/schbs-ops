// La página en los dos idiomas: contenido clave, links que funcionan, accesibilidad (axe, WCAG 2.1 AA) y que no se
// cuele ningún dato privado (mails, teléfonos, IDs de Discord o de planillas).
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const [ruta, titulo, otro] of [
  ["/", "La operación de una tienda", "English"],
  ["/en", "A store's operation", "Español"],
] as const) {
  test(`portada ${ruta}: contenido, anclas y cambio de idioma`, async ({ page }) => {
    await page.goto(ruta);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(titulo);
    await expect(page.locator("#familias li")).toHaveCount(9);
    await expect(page.locator("#titulo-panel")).toBeVisible();
    await expect(page.getByText("Desarrollado por Germán Schouabs.").or(page.getByText("Developed by Germán Schouabs."))).toBeVisible();
    for (const ancla of ["#familias", "#diseno", "#proceso"]) await expect(page.locator(ancla)).toHaveCount(1);
    await page.getByRole("link", { name: otro }).click();
    await expect(page).toHaveURL(ruta === "/" ? /\/en$/ : /\/$/);
  });

  test(`portada ${ruta}: sin datos privados`, async ({ page }) => {
    await page.goto(ruta);
    // El texto visible, los textos alternativos y los links (no el HTML entero: Next mete hashes que parecen IDs).
    const texto = await page.evaluate(() =>
      [document.body.innerText, ...[...document.querySelectorAll("img")].map((i) => i.alt), ...[...document.querySelectorAll("a")].map((a) => a.href)].join("\n"),
    );
    expect(texto).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+/); // mails
    expect(texto).not.toMatch(/\b\d{17,20}\b/); // IDs de Discord
    expect(texto).not.toMatch(/\b1[A-Za-z0-9_-]{30,}\b/); // IDs de Drive o planillas
    expect(texto).not.toMatch(/\+?54\s?9?\s?\d{2,4}[\s-]?\d{3,4}[\s-]?\d{4}/); // teléfonos
  });

  test(`portada ${ruta}: axe sin violaciones serias`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(ruta);
    const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const graves = r.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(graves.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
  });
}
