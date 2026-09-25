const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const HERO_PICS_DIR = path.resolve(__dirname, '../hero page pics');
const DESKTOP_DIR = path.resolve(__dirname, '../client/public/hero-frames');
const MOBILE_DIR = path.resolve(__dirname, '../client/public/hero-frames-mobile');

async function processHeroPics() {
  console.log('=====================================================');
  console.log('   VY NextGen Technologies - Hero Frame Processor    ');
  console.log('=====================================================');

  // Find animated webp or video converter output in hero page pics
  const files = fs.readdirSync(HERO_PICS_DIR);
  const webpFile = files.find(f => f.endsWith('.webp') || f.endsWith('.gif'));

  if (!webpFile) {
    console.error(`No animated webp or gif found in ${HERO_PICS_DIR}`);
    process.exit(1);
  }

  const webpPath = path.join(HERO_PICS_DIR, webpFile);
  console.log(`Source animated file: ${webpPath}`);

  // Inspect metadata
  const metadata = await sharp(webpPath).metadata();
  const totalFrames = metadata.pages || 1;
  console.log(`Dimensions: ${metadata.width}x${metadata.height}`);
  console.log(`Total Frames Detected: ${totalFrames}`);

  if (metadata.delay && metadata.delay.length > 0) {
    const totalMs = metadata.delay.reduce((a, b) => a + b, 0);
    console.log(`Total Animation Duration: ${(totalMs / 1000).toFixed(2)}s`);
  }

  // Ensure output directories exist
  [DESKTOP_DIR, MOBILE_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  const startTime = Date.now();
  let totalDesktopBytes = 0;
  let totalMobileBytes = 0;
  let totalHeroPicsBytes = 0;

  // Process frames in concurrent batches of 8 (optimal for 8 CPU cores)
  const BATCH_SIZE = 8;
  console.log(`\nProcessing ${totalFrames} frames in batches of ${BATCH_SIZE}...`);

  for (let i = 0; i < totalFrames; i += BATCH_SIZE) {
    const batchIndices = [];
    for (let j = i; j < Math.min(i + BATCH_SIZE, totalFrames); j++) {
      batchIndices.push(j);
    }

    await Promise.all(batchIndices.map(async (pageIndex) => {
      const frameNum = String(pageIndex + 1).padStart(3, '0');
      const filename = `ezgif-frame-${frameNum}.jpg`;

      const desktopPath = path.join(DESKTOP_DIR, filename);
      const mobilePath = path.join(MOBILE_DIR, filename);
      const heroPicsPath = path.join(HERO_PICS_DIR, filename);

      // Extract raw frame buffer once
      const frameBuffer = await sharp(webpPath, { page: pageIndex }).toBuffer();

      // 1. Desktop: Upscaled 1080p (1920x1080) with Lanczos3 and unsharp mask
      const desktopBuffer = await sharp(frameBuffer)
        .resize({ width: 1920, height: 1080, kernel: 'lanczos3' })
        .sharpen({ sigma: 1.1, m1: 1.3, m2: 0.5 })
        .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:4:4' })
        .toBuffer();

      fs.writeFileSync(desktopPath, desktopBuffer);
      totalDesktopBytes += desktopBuffer.length;

      // 2. Mobile: Featherlight 800x450 Lanczos3
      const mobileBuffer = await sharp(frameBuffer)
        .resize({ width: 800, height: 450, kernel: 'lanczos3' })
        .sharpen({ sigma: 0.8, m1: 1.1, m2: 0.4 })
        .jpeg({ quality: 82, mozjpeg: true })
        .toBuffer();

      fs.writeFileSync(mobilePath, mobileBuffer);
      totalMobileBytes += mobileBuffer.length;

      // 3. Raw JPG copy in hero page pics
      const heroPicsBuffer = await sharp(frameBuffer)
        .resize({ width: 800, height: 450, kernel: 'lanczos3' })
        .jpeg({ quality: 90, mozjpeg: true })
        .toBuffer();

      fs.writeFileSync(heroPicsPath, heroPicsBuffer);
      totalHeroPicsBytes += heroPicsBuffer.length;
    }));

    const processed = Math.min(i + BATCH_SIZE, totalFrames);
    const pct = ((processed / totalFrames) * 100).toFixed(0);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`Processed ${processed}/${totalFrames} frames (${pct}%) in ${elapsed}s...`);
  }

  // Clean up any stale old frames (> totalFrames) in desktop and mobile directories
  console.log('\nCleaning up old frames exceeding new frame count...');
  [DESKTOP_DIR, MOBILE_DIR].forEach(dir => {
    const existing = fs.readdirSync(dir).filter(f => f.startsWith('ezgif-frame-') && f.endsWith('.jpg'));
    let removedCount = 0;
    existing.forEach(f => {
      const match = f.match(/ezgif-frame-(\d+)\.jpg/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > totalFrames) {
          fs.unlinkSync(path.join(dir, f));
          removedCount++;
        }
      }
    });
    if (removedCount > 0) {
      console.log(`Removed ${removedCount} stale frames from ${path.basename(dir)}`);
    }
  });

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  const desktopMB = (totalDesktopBytes / (1024 * 1024)).toFixed(2);
  const mobileMB = (totalMobileBytes / (1024 * 1024)).toFixed(2);
  const heroPicsMB = (totalHeroPicsBytes / (1024 * 1024)).toFixed(2);

  console.log('\n=====================================================');
  console.log(' Hero Frame Processing Complete!');
  console.log(` Total Frames: ${totalFrames}`);
  console.log(` Processing Time: ${totalTime}s`);
  console.log(` Desktop 1080p Total Size: ${desktopMB} MB (${DESKTOP_DIR})`);
  console.log(` Mobile 450p Total Size: ${mobileMB} MB (${MOBILE_DIR})`);
  console.log(` Hero Pics JPGs Total Size: ${heroPicsMB} MB (${HERO_PICS_DIR})`);
  console.log('=====================================================\n');
}

processHeroPics().catch(err => {
  console.error('Fatal error in processHeroPics:', err);
  process.exit(1);
});
