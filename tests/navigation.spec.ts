import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('homepage loads and displays title', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('Preston Peak')
  })

  test('navigation links work', async ({ page }) => {
    await page.goto('/')

    // Navigate to About
    await page.click('text=About')
    await expect(page.locator('h1')).toContainText('About')

    // Navigate to Listen
    await page.click('text=Listen')
    await expect(page.locator('h1')).toContainText('Listen')

    // Navigate to News
    await page.click('text=News')
    await expect(page.locator('h1')).toContainText('News')

    // Navigate to Contact
    await page.click('text=Contact')
    await expect(page.locator('h1')).toContainText('Commission')
  })

  test('logo navigates to home', async ({ page }) => {
    await page.goto('/#/about')
    await page.click('nav a:has-text("Preston Peak")')
    await expect(page.locator('h1')).toContainText('Preston Peak')
  })
})
