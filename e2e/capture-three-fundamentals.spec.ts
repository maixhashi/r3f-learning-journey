import { test } from '@playwright/test'
import { capturePages } from './helpers/capturePages'

test('capture three-fundamentals changed screens', async ({ page }) => {
  await capturePages(page, 'three-fundamentals', [
    { fileName: '01-home.png', url: '/' },
    { fileName: '02-demos-index.png', url: '/demos' },
    { fileName: '03-fundamentals-index.png', url: '/demos/three-fundamentals' },
    {
      fileName: '04-hello-scene.png',
      url: '/demos/three-fundamentals/hello-scene',
      waitForSelector: 'canvas',
      waitMs: 1000,
    },
  ])
})
