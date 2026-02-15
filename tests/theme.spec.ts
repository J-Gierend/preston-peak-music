import { test, expect } from '@playwright/test'

test.describe('Theme', () => {
  test('theme is controlled by world selection', async ({ page }) => {
    await page.goto('/#/works')

    // Works page defaults to classical (light theme)
    const initialTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    )
    expect(initialTheme).toBe('light')

    // Switch to gaming world
    const gamingTab = page.locator('[data-testid="world-tab-gaming"]')
    await gamingTab.click()

    // Gaming world should be dark theme
    const gamingTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    )
    expect(gamingTheme).toBe('dark')

    // Switch back to classical
    const classicalTab = page.locator('[data-testid="world-tab-classical"]')
    await classicalTab.click()

    // Classical world should be light theme
    const classicalTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    )
    expect(classicalTheme).toBe('light')
  })

  test('games page renders', async ({ page }) => {
    await page.goto('/#/games')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('classical URL redirects to works page', async ({ page }) => {
    await page.goto('/#/classical')
    await page.waitForTimeout(300)
    expect(page.url()).toContain('#/works')
  })
})
