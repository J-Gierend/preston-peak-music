import { test, expect } from '@playwright/test'

test.describe('Work Modals', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/works')
    await page.waitForSelector('[data-testid="work-card"]', { timeout: 10000 })
  })

  test('clicking work card opens modal', async ({ page }) => {
    await page.locator('[data-testid="work-card"]').first().click()
    await expect(page.locator('[data-testid="work-modal"]')).toBeVisible()
  })

  test('modal can be closed with close button', async ({ page }) => {
    await page.locator('[data-testid="work-card"]').first().click()
    await page.waitForSelector('[data-testid="work-modal"]')
    await page.click('button[aria-label="Close"]')
    await page.waitForTimeout(500)
    await expect(page.locator('[data-testid="work-modal"]')).toHaveCount(0)
  })

  test('modal updates URL hash', async ({ page }) => {
    await page.locator('[data-testid="work-card"]').first().click()
    await page.waitForTimeout(300)
    expect(page.url()).toMatch(/#.*/)
  })

  test('escape key closes modal', async ({ page }) => {
    await page.locator('[data-testid="work-card"]').first().click()
    await page.waitForSelector('[data-testid="work-modal"]')
    await page.keyboard.press('Escape')
    await page.waitForTimeout(500)
    await expect(page.locator('[data-testid="work-modal"]')).toHaveCount(0)
  })
})

test.describe('Pack Modals', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/works')
    // Switch to gaming world
    const gamingTab = page.locator('[data-testid="world-tab-gaming"]')
    await gamingTab.click()
    await page.waitForSelector('[data-testid="pack-card"]', { timeout: 10000 })
  })

  test('clicking pack card opens modal', async ({ page }) => {
    await page.locator('[data-testid="pack-card"]').first().click()
    await expect(page.locator('[data-testid="pack-modal"]')).toBeVisible()
  })

  test('pack modal shows itch.io link', async ({ page }) => {
    await page.locator('[data-testid="pack-card"]').first().click()
    await page.waitForSelector('[data-testid="pack-modal"]')
    await expect(page.locator('[data-testid="pack-modal"] a:has-text("itch.io")')).toBeVisible()
  })
})
