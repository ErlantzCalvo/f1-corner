import { test, expect } from "@playwright/test";

test("Toggle theme", async ({ page }) => {
    await page.goto("/");
    const themeToggle = page.locator("#themeToggler label");
    await themeToggle.click();
    await expect(page.locator("html")).toHaveClass("dark");
    let savedValue = await page.evaluate(() => localStorage.getItem('theme'))
    await expect(savedValue).toBe('dark');

    await themeToggle.click();
    await expect(page.locator("html")).not.toHaveClass("dark");
    savedValue = await page.evaluate(() => localStorage.getItem('theme'))
    await expect(savedValue).toBe('light');
  });