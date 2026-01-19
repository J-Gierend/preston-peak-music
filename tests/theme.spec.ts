import { test, expect } from '@playwright/test'

test.describe('Theme', () => {
  test('theme toggle changes theme', async ({ page }) => {
    await page.goto('/#/')

    // Find and click theme toggle
    const themeToggle = page.locator('button[aria-label*="mode"]')
    await expect(themeToggle).toBeVisible()

    // Get initial theme
    const initialTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    )

    // Click toggle
    await themeToggle.click()

    // Theme should change
    const newTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    )

    expect(newTheme).not.toBe(initialTheme)
  })

  test('games page has gaming aesthetic', async ({ page }) => {
    await page.goto('/#/games')

    const aesthetic = await page.evaluate(() =>
      document.querySelector('[data-aesthetic]')?.getAttribute('data-aesthetic')
    )

    expect(aesthetic).toBe('gaming')
  })

  test('classical page has classical aesthetic', async ({ page }) => {
    await page.goto('/#/classical')

    const aesthetic = await page.evaluate(() =>
      document.querySelector('[data-aesthetic]')?.getAttribute('data-aesthetic')
    )

    expect(aesthetic).toBe('classical')
  })
})
