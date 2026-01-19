import { test, expect } from '@playwright/test'

test.describe('Work Modals', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/classical')
    await page.waitForSelector('article', { timeout: 10000 })
  })

  test('clicking work card opens modal', async ({ page }) => {
    await page.click('article:first-of-type')
    await expect(page.locator('.fixed.inset-0.z-50')).toBeVisible()
  })

  test('modal can be closed with close button', async ({ page }) => {
    await page.click('article:first-of-type')
    await page.waitForSelector('.fixed.inset-0 button[aria-label="Close"]')
    await page.click('button[aria-label="Close"]')
    await page.waitForTimeout(500)
    await expect(page.locator('.fixed.inset-0 .relative')).toHaveCount(0)
  })

  test('modal updates URL hash', async ({ page }) => {
    await page.click('article:first-of-type')
    await page.waitForTimeout(300)
    expect(page.url()).toMatch(/#.*-/)
  })

  test('escape key closes modal', async ({ page }) => {
    await page.click('article:first-of-type')
    await page.waitForSelector('.fixed.inset-0 button[aria-label="Close"]')
    await page.keyboard.press('Escape')
    await page.waitForTimeout(500)
    await expect(page.locator('.fixed.inset-0 .relative')).toHaveCount(0)
  })
})

test.describe('Pack Modals', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/games')
    await page.waitForSelector('article', { timeout: 10000 })
  })

  test('clicking pack card opens modal', async ({ page }) => {
    await page.click('article:first-of-type')
    await expect(page.locator('.fixed.inset-0.z-50')).toBeVisible()
  })

  test('pack modal shows itch.io link', async ({ page }) => {
    await page.click('article:first-of-type')
    await page.waitForSelector('.fixed.inset-0.z-50 a')
    await expect(page.locator('.fixed.inset-0.z-50 a:has-text("itch.io")')).toBeVisible()
  })
})
