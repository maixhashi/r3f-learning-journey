import fs from 'node:fs'
import path from 'node:path'
import type { Page } from '@playwright/test'

export type CaptureTarget = {
  /** Output filename, e.g. 01-home.png */
  fileName: string
  /** Path relative to baseURL, e.g. /demos */
  url: string
  /** Extra wait after load (ms). Use for WebGL / canvas. */
  waitMs?: number
  /** Wait for this selector before screenshot (default: none). */
  waitForSelector?: string
}

/**
 * Navigate each target and save full-page PNGs under docs/screenshots/{topic}/.
 */
export async function capturePages(
  page: Page,
  topic: string,
  targets: CaptureTarget[],
  repoRoot = process.cwd()
): Promise<string[]> {
  const outDir = path.join(repoRoot, 'docs', 'screenshots', topic)
  fs.mkdirSync(outDir, { recursive: true })

  const written: string[] = []

  for (const target of targets) {
    await page.goto(target.url, { waitUntil: 'networkidle' })
    if (target.waitForSelector) {
      await page.waitForSelector(target.waitForSelector, { timeout: 30_000 })
    }
    if (target.waitMs) {
      await page.waitForTimeout(target.waitMs)
    }
    const filePath = path.join(outDir, target.fileName)
    await page.screenshot({ path: filePath, fullPage: true })
    written.push(filePath)
  }

  return written
}
