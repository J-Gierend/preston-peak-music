import { test, expect } from '@playwright/test'

test.describe('Homepage - Navigation Hub', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/')
  })

  test('displays Preston Peak name prominently', async ({ page }) => {
    const heading = page.locator('h1')
    await expect(heading).toContainText('Preston Peak')
  })

  test('displays composer tagline', async ({ page }) => {
    const tagline = page.locator('[data-testid="hero-tagline"]')
    await expect(tagline).toBeVisible()
    await expect(tagline).toContainText('Composer')
  })

  test('has navigation cards linking to correct routes', async ({ page }) => {
    const worksCard = page.locator('[data-testid="nav-card-works"]')
    const aboutCard = page.locator('[data-testid="nav-card-about"]')
    const listenCard = page.locator('[data-testid="nav-card-listen"]')
    const contactCard = page.locator('[data-testid="nav-card-contact"]')

    await expect(worksCard).toBeVisible()
    await expect(aboutCard).toBeVisible()
    await expect(listenCard).toBeVisible()
    await expect(contactCard).toBeVisible()

    // Verify links (hash-based routing)
    await expect(worksCard).toHaveAttribute('href', expect.stringContaining('#/works'))
    await expect(aboutCard).toHaveAttribute('href', expect.stringContaining('#/about'))
    await expect(listenCard).toHaveAttribute('href', expect.stringContaining('#/listen'))
    await expect(contactCard).toHaveAttribute('href', expect.stringContaining('#/contact'))
  })

  test('no world toggle on homepage', async ({ page }) => {
    const worldToggle = page.locator('[data-testid="world-toggle"]')
    await expect(worldToggle).toHaveCount(0)
  })

  test('no content grid on homepage', async ({ page }) => {
    const contentSection = page.locator('[data-testid="world-content-section"]')
    await expect(contentSection).toHaveCount(0)
  })

  test('clicking Works card navigates to works page', async ({ page }) => {
    await page.click('[data-testid="nav-card-works"]')
    await expect(page).toHaveURL(/#\/works/)
  })
})
