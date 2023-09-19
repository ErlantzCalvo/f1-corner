import { test, expect } from "@playwright/test";

test("Toggle language picker", async ({ page }) => {
  await page.goto("/");
  const langButton = page.locator("language-picker > button");
  await langButton.click();

  await expect(langButton).toHaveAttribute("aria-expanded", "true");

  await page.locator("body").click();
  await expect(langButton).toHaveAttribute("aria-expanded", "false");
});

test("Redirect language", async ({ page }) => {
  await page.goto("/");

  // in / -> click spanish -> redirect to /es/
  const langButton = page.locator("language-picker > button");
  await langButton.click();
  await page.getByRole("option", { name: "Español" }).click();
  await expect(page).toHaveURL("/es/");

  // in /ranking -> click spanish -> redirect to /es/ranking/
  await page.goto("/ranking");
  await langButton.click();
  await page.getByRole("option", { name: "Español" }).click();
  await expect(page).toHaveURL("/es/ranking");

  // in /es/qualifying -> click englihs -> redirect to /qualifying
  await page.goto("/es/qualifying");
  await langButton.click();
  await page.getByRole("option", { name: "English" }).click();
  await expect(page).toHaveURL("/qualifying");
});
