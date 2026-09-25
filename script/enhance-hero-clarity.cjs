const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const HERO_PICS_DIR = path.resolve(__dirname, '../hero page pics');
const DESKTOP_DIR = path.resolve(__dirname, '../client/public/hero-frames');
const MOBILE_DIR = path.resolve(__dirname, '../client/public/hero-frames-mobile');

async function enhanceClarity() {
  console.log('===============================================================');
  console.log('       VY NextGen Technologies - Hero Clarity Enhancer         ');
  console.log('===============================================================');

  // Find source animated webp
  const files = fs.readdirSync(HERO_PICS_DIR);
  const webpFile = files.find(f => f.endsWith('.webp') || f.endsWith('.gif'));

  if (!webpFile) {
    console.error(`Error: No animated webp or gif found in ${HERO_PICS_DIR}`);
    process.exit(1);
  }

  const webpPath = path.join(HERO_PICS_DIR, webpFile);
  console.log(`Source animated file: ${webpPath}`);

  const metadata = await sharp(webpPath).metadata();
  const totalFrames = metadata.pages || 1;
  console.log(`Detected: ${totalFrames} frames (${metadata.width}x${metadata.height})`);

  // Ensure directories exist
  [HERO_PICS_DIR, DESKTOP_DIR, MOBILE_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  const startTime = Date.now();
  let totalMasterBytes = 0;
  let totalDesktopBytes = 0;
  let totalMobileBytes = 0;

  // Process in concurrent batches of 8 for optimal multicore CPU utilization
  const BATCH_SIZE = 8;
  console.log(`\nEnhancing ${totalFrames} frames with Pro Clarity Pipeline in batches of ${BATCH_SIZE}...`);
  console.log('Pipeline: Lanczos3 Resampling + CLAHE Local Contrast + Scientific Dehaze + Unsharp Mask\n');

  for (let i = 0; i < totalFrames; i += BATCH_SIZE) {
    const batchIndices = [];
    for (let j = i; j < Math.min(i + BATCH_SIZE, totalFrames); j++) {
      batchIndices.push(j);
    }

    await Promise.all(batchIndices.map(async (pageIndex) => {
      const frameNum = String(pageIndex + 1).padStart(3, '0');
      const filename = `ezgif-frame-${frameNum}.jpg`;

      const masterPath = path.join(HERO_PICS_DIR, filename);
      const desktopPath = path.join(DESKTOP_DIR, filename);
      const mobilePath = path.join(MOBILE_DIR, filename);

      // Extract raw frame buffer directly from source webp to avoid multi-generation compression loss
      const frameBuffer = await sharp(webpPath, { page: pageIndex }).toBuffer();

      // 1. MASTER HIGH-CLARITY (1920x1080) for `hero page pics`
      // High fidelity Q92, 4:4:4 full chroma subsampling, CLAHE micro-contrast, expanded dynamic range
      const masterBuffer = await sharp(frameBuffer)
        .resize(1920, 1080, { kernel: 'lanczos3' })
        .clahe({ width: 48, height: 48, maxSlope: 3 })
        .modulate({ brightness: 1.01, saturation: 1.15 })
        .linear(1.08, -8)
        .sharpen({ sigma: 1.25, m1: 1.9, m2: 0.85, x1: 2, y2: 15 })
        .jpeg({ quality: 92, chromaSubsampling: '4:4:4', mozjpeg: true })
        .toBuffer();

      fs.writeFileSync(masterPath, masterBuffer);
      totalMasterBytes += masterBuffer.length;

      // 2. DESKTOP OPTIMIZED (1920x1080) for `client/public/hero-frames`
      // Same pristine clarity pipeline, optimized at Q88 with 4:4:4 chroma for 60fps web scroll delivery
      const desktopBuffer = await sharp(frameBuffer)
        .resize(1920, 1080, { kernel: 'lanczos3' })
        .clahe({ width: 48, height: 48, maxSlope: 3 })
        .modulate({ brightness: 1.01, saturation: 1.15 })
        .linear(1.08, -8)
        .sharpen({ sigma: 1.25, m1: 1.9, m2: 0.85, x1: 2, y2: 15 })
        .jpeg({ quality: 88, chromaSubsampling: '4:4:4', mozjpeg: true })
        .toBuffer();

      fs.writeFileSync(desktopPath, desktopBuffer);
      totalDesktopBytes += desktopBuffer.length;

      // 3. MOBILE OPTIMIZED (800x450) for `client/public/hero-frames-mobile`
      // Featherweight memory footprint with mobile-tuned CLAHE & edge sharpness for Retina mobile displays
      const mobileBuffer = await sharp(frameBuffer)
        .resize(800, 450, { kernel: 'lanczos3' })
        .clahe({ width: 32, height: 32, maxSlope: 2 })
        .modulate({ brightness: 1.01, saturation: 1.15 })
        .linear(1.08, -8)
        .sharpen({ sigma: 0.9, m1: 1.4, m2: 0.6 })
        .jpeg({ quality: 84, mozjpeg: true })
        .toBuffer();

      fs.writeFileSync(mobilePath, mobileBuffer);
      totalMobileBytes += mobileBuffer.length;
    }));

    const processed = Math.min(i + BATCH_SIZE, totalFrames);
    const pct = ((processed / totalFrames) * 100).toFixed(0);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`[Clarity Enhancer] Processed ${processed}/${totalFrames} frames (${pct}%) in ${elapsed}s...`);
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  const masterMB = (totalMasterBytes / (1024 * 1024)).toFixed(2);
  const desktopMB = (totalDesktopBytes / (1024 * 1024)).toFixed(2);
  const mobileMB = (totalMobileBytes / (1024 * 1024)).toFixed(2);

  console.log('\n===============================================================');
  console.log('             Clarity Enhancement Completed Successfully!       ');
  console.log(` Total Frames Processed: ${totalFrames}`);
  console.log(` Total Execution Time:   ${totalTime}s`);
  console.log(` hero page pics (Master 1080p Q92):       ${masterMB} MB -> ${HERO_PICS_DIR}`);
  console.log(` hero-frames (Web Desktop 1080p Q88):     ${desktopMB} MB -> ${DESKTOP_DIR}`);
  console.log(` hero-frames-mobile (Mobile 450p Q84):    ${mobileMB} MB -> ${MOBILE_DIR}`);
  console.log('===============================================================\n');
}

enhanceClarity().catch(err => {
  console.error('Fatal error during clarity enhancement:', err);
  process.exit(1);
});
