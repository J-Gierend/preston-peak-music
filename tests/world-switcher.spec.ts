import { test, expect } from '@playwright/test'

test.describe('World Switcher Works Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/works')
  })

  test('displays world toggle on works page', async ({ page }) => {
    const worldToggle = page.locator('[data-testid="world-toggle"]')
    await expect(worldToggle).toBeVisible()

    // Should have both world options
    const classicalTab = page.locator('[data-testid="world-tab-classical"]')
    const gamingTab = page.locator('[data-testid="world-tab-gaming"]')

    await expect(classicalTab).toBeVisible()
    await expect(gamingTab).toBeVisible()
  })

  test('defaults to classical world on works page', async ({ page }) => {
    // Classical tab should be active by default
    const classicalTab = page.locator('[data-testid="world-tab-classical"]')
    await expect(classicalTab).toHaveAttribute('data-active', 'true')

    // Aesthetic should be classical
    const aesthetic = await page.evaluate(() =>
      document.documentElement.getAttribute('data-aesthetic')
    )
    expect(aesthetic).toBe('classical')
  })

  test('switches to gaming world when tab clicked', async ({ page }) => {
    const gamingTab = page.locator('[data-testid="world-tab-gaming"]')
    await gamingTab.click()

    // Gaming tab should now be active
    await expect(gamingTab).toHaveAttribute('data-active', 'true')

    // Classical tab should no longer be active
    const classicalTab = page.locator('[data-testid="world-tab-classical"]')
    await expect(classicalTab).toHaveAttribute('data-active', 'false')

    // Aesthetic should change to gaming
    const aesthetic = await page.evaluate(() =>
      document.documentElement.getAttribute('data-aesthetic')
    )
    expect(aesthetic).toBe('gaming')
  })

  test('displays classical works when in classical world', async ({ page }) => {
    // Wait for content to load
    await page.waitForSelector('[data-testid="world-content-section"]')

    // Classical world should show works
    const worksSection = page.locator('[data-testid="classical-works-grid"]')
    await expect(worksSection).toBeVisible()

    // Should have work cards
    const workCards = page.locator('[data-testid="work-card"]')
    await expect(workCards.first()).toBeVisible()
  })

  test('displays game packs when in gaming world', async ({ page }) => {
    // Switch to gaming world
    const gamingTab = page.locator('[data-testid="world-tab-gaming"]')
    await gamingTab.click()

    // Wait for content to load
    await page.waitForSelector('[data-testid="world-content-section"]')

    // Gaming world should show packs
    const packsSection = page.locator('[data-testid="gaming-packs-grid"]')
    await expect(packsSection).toBeVisible()

    // Should have pack cards
    const packCards = page.locator('[data-testid="pack-card"]')
    await expect(packCards.first()).toBeVisible()
  })

  test('clicking work card opens work modal', async ({ page }) => {
    await page.waitForSelector('[data-testid="work-card"]')

    const workCard = page.locator('[data-testid="work-card"]').first()
    await workCard.click()

    // Modal should open
    const modal = page.locator('[data-testid="work-modal"]')
    await expect(modal).toBeVisible()
  })

  test('clicking pack card opens pack modal (gaming world)', async ({ page }) => {
    // Switch to gaming world
    const gamingTab = page.locator('[data-testid="world-tab-gaming"]')
    await gamingTab.click()

    await page.waitForSelector('[data-testid="pack-card"]')

    const packCard = page.locator('[data-testid="pack-card"]').first()
    await packCard.click()

    // Modal should open
    const modal = page.locator('[data-testid="pack-modal"]')
    await expect(modal).toBeVisible()
  })
})
