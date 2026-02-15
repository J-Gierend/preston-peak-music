import { test, expect } from '@playwright/test'

test.describe('Design System - Modern Elegant', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/')
  })

  test('no scanline overlay present', async ({ page }) => {
    // Navigate to works page where gaming toggle is available
    await page.goto('/#/works')
    const navToggle = page.locator('[data-testid="nav-world-toggle"] .gaming').first()
    await navToggle.click()

    // Check that the html element doesn't have a visible ::after pseudo-element with scanlines
    const hasScanlines = await page.evaluate(() => {
      const root = document.documentElement
      const after = window.getComputedStyle(root, '::after')
      return after.content !== 'none' && after.content !== ''
    })
    expect(hasScanlines).toBe(false)
  })

  test('no pixel font used in gaming mode headings', async ({ page }) => {
    await page.goto('/#/works')
    const navToggle = page.locator('[data-testid="nav-world-toggle"] .gaming').first()
    await navToggle.click()

    const h1Font = await page.evaluate(() => {
      const h1 = document.querySelector('h1')
      if (!h1) return ''
      return window.getComputedStyle(h1).fontFamily
    })
    expect(h1Font).not.toContain('Press Start 2P')
  })

  test('no particle canvas element on page', async ({ page }) => {
    const canvas = page.locator('canvas')
    await expect(canvas).toHaveCount(0)
  })

  test('no themed background floating particles', async ({ page }) => {
    const themedBg = page.locator('.themed-background')
    await expect(themedBg).toHaveCount(0)
  })

  test('gaming mode only changes colors, not fonts', async ({ page }) => {
    await page.goto('/#/works')

    // Get classical heading font
    const classicalFont = await page.evaluate(() => {
      const h1 = document.querySelector('h1')
      return h1 ? window.getComputedStyle(h1).fontFamily : ''
    })

    // Switch to gaming
    const navToggle = page.locator('[data-testid="nav-world-toggle"] .gaming').first()
    await navToggle.click()
    await page.waitForTimeout(100)

    // Get gaming heading font
    const gamingFont = await page.evaluate(() => {
      const h1 = document.querySelector('h1')
      return h1 ? window.getComputedStyle(h1).fontFamily : ''
    })

    // Fonts should be the same in both modes
    expect(gamingFont).toBe(classicalFont)
  })

  test('no glow effects in gaming mode', async ({ page }) => {
    await page.goto('/#/works')
    const navToggle = page.locator('[data-testid="nav-world-toggle"] .gaming').first()
    await navToggle.click()

    const hasGlow = await page.evaluate(() => {
      const elements = document.querySelectorAll('h1, h2, h3, .glow, .glow-secondary')
      for (const el of elements) {
        const style = window.getComputedStyle(el)
        if (style.textShadow && style.textShadow !== 'none') {
          return true
        }
      }
      return false
    })
    expect(hasGlow).toBe(false)
  })

  test('all border-radius values are 0', async ({ page }) => {
    const radii = await page.evaluate(() => {
      const root = document.documentElement
      const style = getComputedStyle(root)
      return {
        sm: style.getPropertyValue('--radius-sm').trim(),
        md: style.getPropertyValue('--radius-md').trim(),
        lg: style.getPropertyValue('--radius-lg').trim(),
        xl: style.getPropertyValue('--radius-xl').trim()
      }
    })
    expect(radii.sm).toBe('0')
    expect(radii.md).toBe('0')
    expect(radii.lg).toBe('0')
    expect(radii.xl).toBe('0')
  })

  test('newsletter signup form is visible in footer', async ({ page }) => {
    const newsletter = page.locator('[data-testid="newsletter-signup"]')
    await expect(newsletter).toBeVisible()
  })

  test('newsletter validates email format', async ({ page }) => {
    const emailInput = page.locator('[data-testid="newsletter-email"]')
    const submitBtn = page.locator('[data-testid="newsletter-submit"]')

    await submitBtn.click()

    const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid)
    expect(isValid).toBe(false)
  })
})
