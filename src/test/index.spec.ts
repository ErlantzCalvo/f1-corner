import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) =>{
  await page.goto("/");
})

test("Titles are correct", async ({ page }) => {
  await expect(page).toHaveTitle("F1-corner");

  await page.goto("/qualifying");
  await expect(page).toHaveTitle("Qualifying");

  await page.goto("/ranking");
  await expect(page).toHaveTitle("Ranking");

  await page.goto("/es/");
  await expect(page).toHaveTitle("F1-corner");

  await page.goto("/es/qualifying");
  await expect(page).toHaveTitle("Clasificación");

  await page.goto("/es/ranking");
  await expect(page).toHaveTitle("Ranking");
});

test("Navigation with nav links", async ({ page }) => {
  const navLinks = await page.locator("nav > a");
  const linksCount = await navLinks.count();

  for (let i = 0; i < linksCount; i++) {
    const path = await navLinks.nth(i).getAttribute("href");
    await navLinks.nth(i).click();
    await expect(page).toHaveURL(path!);
  }
});






