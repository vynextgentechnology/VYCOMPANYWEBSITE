import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('File Download End-to-End Suite', () => {
  test('should trigger, capture, and verify downloaded file using Playwright pattern', async ({ page }) => {
    // 1. Navigate to the page containing the downloadable asset
    await page.goto('/enquiry');

    // 2. Verify the download element is ready and visible
    const downloadBtn = page.getByText('Download file');
    await expect(downloadBtn).toBeVisible({ timeout: 10000 });

    // 3. Start waiting for download before clicking. Note no await.
    const downloadPromise = page.waitForEvent('download');
    await downloadBtn.click();
    const download = await downloadPromise;

    // 4. Set target download directory
    const downloadsFolder = path.resolve(process.cwd(), 'test-downloads');
    if (!fs.existsSync(downloadsFolder)) {
      fs.mkdirSync(downloadsFolder, { recursive: true });
    }

    const saveLocation = path.join(downloadsFolder, download.suggestedFilename());

    // 5. Wait for the download process to complete and save the downloaded file somewhere.
    await download.saveAs(saveLocation);

    // 6. Assertions: File successfully written to disk with non-zero byte size
    expect(fs.existsSync(saveLocation)).toBe(true);
    const fileStats = fs.statSync(saveLocation);
    expect(fileStats.size).toBeGreaterThan(0);
    expect(download.suggestedFilename()).toContain('.pdf');

    console.log(`[E2E Test Success] Downloaded: ${download.suggestedFilename()} (${fileStats.size} bytes)`);

    // Clean up test artifact
    try {
      fs.unlinkSync(saveLocation);
    } catch {
      // Ignored
    }
  });
});
