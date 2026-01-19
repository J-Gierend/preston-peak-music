import { test, expect } from '@playwright/test'

test.describe('Commission Wizard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/contact')
    await page.waitForSelector('h2', { timeout: 10000 })
  })

  test('commission wizard shows first step', async ({ page }) => {
    await expect(page.locator('h2')).toContainText('What type of project')
  })

  test('can navigate through wizard steps', async ({ page }) => {
    // Step 1: Select project type
    await page.click('text=Classical / Concert')
    await page.click('text=Continue')

    // Step 2: Select scope
    await expect(page.locator('h2')).toContainText('Project scope')
    await page.click('text=Medium')
    await page.click('text=Continue')

    // Step 3: Details form
    await expect(page.locator('h2')).toContainText('Tell me about your project')
    await expect(page.locator('input#name')).toBeVisible()
    await expect(page.locator('input#email')).toBeVisible()
  })

  test('can go back in wizard', async ({ page }) => {
    // Go to step 2
    await page.click('text=Classical / Concert')
    await page.click('text=Continue')

    // Go back to step 1
    await page.click('text=Back')
    await expect(page.locator('h2')).toContainText('What type of project')
  })

  test('continue button is disabled until selection made', async ({ page }) => {
    const continueButton = page.locator('button:has-text("Continue")')
    await expect(continueButton).toBeDisabled()

    await page.click('text=Video Game')
    await expect(continueButton).toBeEnabled()
  })
})
