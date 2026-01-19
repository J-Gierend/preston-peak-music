import { test, expect } from '@playwright/test'

test.describe('World Switcher Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/')
  })

  test('displays world toggle on homepage', async ({ page }) => {
    const worldToggle = page.locator('[data-testid="world-toggle"]')
    await expect(worldToggle).toBeVisible()

    // Should have both world options
    const classicalTab = page.locator('[data-testid="world-tab-classical"]')
    const gamingTab = page.locator('[data-testid="world-tab-gaming"]')

    await expect(classicalTab).toBeVisible()
    await expect(gamingTab).toBeVisible()
  })

  test('defaults to classical world on homepage', async ({ page }) => {
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

  test('switches theme with world (classical=light-ready, gaming=dark)', async ({ page }) => {
    // Switch to gaming
    const gamingTab = page.locator('[data-testid="world-tab-gaming"]')
    await gamingTab.click()

    // Should be dark theme for gaming
    const themeAfterGaming = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    )
    expect(themeAfterGaming).toBe('dark')

    // Switch back to classical
    const classicalTab = page.locator('[data-testid="world-tab-classical"]')
    await classicalTab.click()

    // Theme changes with classical (may be light or keep previous)
    const aesthetic = await page.evaluate(() =>
      document.documentElement.getAttribute('data-aesthetic')
    )
    expect(aesthetic).toBe('classical')
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

  test('hero background changes with world selection', async ({ page }) => {
    // Get initial background
    const hero = page.locator('[data-testid="hero-section"]')
    const initialBg = await hero.evaluate((el) => {
      const bgDiv = el.querySelector('[data-testid="hero-background"]')
      return bgDiv?.getAttribute('style') || ''
    })

    // Switch to gaming
    const gamingTab = page.locator('[data-testid="world-tab-gaming"]')
    await gamingTab.click()

    // Wait for transition
    await page.waitForTimeout(300)

    // Background should change
    const newBg = await hero.evaluate((el) => {
      const bgDiv = el.querySelector('[data-testid="hero-background"]')
      return bgDiv?.getAttribute('style') || ''
    })

    expect(newBg).not.toBe(initialBg)
    expect(newBg).toContain('gaming')
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

  test('world toggle has smooth transition animation', async ({ page }) => {
    const worldToggle = page.locator('[data-testid="world-toggle"]')

    // Check toggle has transition styles
    const hasTransition = await worldToggle.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return style.transition !== 'none' && style.transition !== ''
    })

    expect(hasTransition).toBe(true)
  })

  test('content section transitions smoothly between worlds', async ({ page }) => {
    const contentSection = page.locator('[data-testid="world-content-section"]')
    await expect(contentSection).toBeVisible()

    // Check content section has transition
    const hasTransition = await contentSection.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return style.transition.includes('opacity') || style.transition.includes('all')
    })

    expect(hasTransition).toBe(true)
  })
})
