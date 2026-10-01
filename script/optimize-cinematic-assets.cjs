const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\LOQ\\.gemini\\antigravity-ide\\brain\\18438c40-7f5d-4ca9-ada3-d96f312dfa83';
const publicCinematicDir = path.resolve(__dirname, '../client/public/cinematic');
const mobileCinematicDir = path.resolve(publicCinematicDir, 'mobile');

if (!fs.existsSync(publicCinematicDir)) {
  fs.mkdirSync(publicCinematicDir, { recursive: true });
}
if (!fs.existsSync(mobileCinematicDir)) {
  fs.mkdirSync(mobileCinematicDir, { recursive: true });
}

const assets = [
  { prefix: 'about_command_center', targetName: 'about-command-center' },
  { prefix: 'web_digital_city', targetName: 'web-digital-city' },
  { prefix: 'billing_business_core', targetName: 'billing-business-core' },
  { prefix: 'internship_future_lab', targetName: 'internship-future-lab' },
  { prefix: 'careers_tech_center', targetName: 'careers-tech-center' },
  { prefix: 'contact_communication_hub', targetName: 'contact-communication-hub' },
];

async function run() {
  const brainFiles = fs.readdirSync(brainDir);

  for (const asset of assets) {
    const matched = brainFiles.find(f => f.startsWith(asset.prefix) && (f.endsWith('.jpg') || f.endsWith('.png')));
    if (!matched) {
      console.warn(`File not found for ${asset.prefix}`);
      continue;
    }

    const inputPath = path.join(brainDir, matched);
    const desktopOut = path.join(publicCinematicDir, `${asset.targetName}.webp`);
    const mobileOut = path.join(mobileCinematicDir, `${asset.targetName}.webp`);

    console.log(`Processing ${matched} -> ${asset.targetName}.webp`);

    // Desktop: 1920x1080 webp, quality 82
    await sharp(inputPath)
      .resize(1920, 1080, { fit: 'cover', position: 'center' })
      .webp({ quality: 82, effort: 4 })
      .toFile(desktopOut);

    // Mobile: 800x1200 webp (vertical-optimized), quality 80
    await sharp(inputPath)
      .resize(800, 1200, { fit: 'cover', position: 'center' })
      .webp({ quality: 80, effort: 4 })
      .toFile(mobileOut);

    console.log(`Saved: ${desktopOut} & ${mobileOut}`);
  }

  console.log('All cinematic poster assets generated successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
