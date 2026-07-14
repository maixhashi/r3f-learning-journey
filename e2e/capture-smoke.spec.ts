import { test } from '@playwright/test'
import { capturePages } from './helpers/capturePages'

/**
 * Minimal capture run to verify the helper. Override targets via
 * feature-specific specs (e.g. capture-three-fundamentals.spec.ts).
 */
test('capture smoke pages', async ({ page }) => {
  await capturePages(page, 'playwright-setup', [
    { fileName: '01-home.png', url: '/' },
    { fileName: '02-demos.png', url: '/demos' },
  ])
})
