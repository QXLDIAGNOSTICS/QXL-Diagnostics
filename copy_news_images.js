const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'images', 'news');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const source1 = '/Users/afi/.gemini/antigravity-ide/brain/81fb0523-8d31-4ef7-8b0b-7988100770b4/news_hero_banner_1789765319603.png';
const target1 = path.join(targetDir, 'qxl-hlm-media-coverage-2028.png');

const source2 = '/Users/afi/.gemini/antigravity-ide/brain/81fb0523-8d31-4ef7-8b0b-7988100770b4/hospital_partner_lab_1789765336877.png';
const target2 = path.join(targetDir, 'qxl-hospital-partnership-2028.png');

try {
  fs.copyFileSync(source1, target1);
  console.log('Copied image 1 successfully to', target1);
} catch (err) {
  console.error('Error copying image 1:', err);
}

try {
  fs.copyFileSync(source2, target2);
  console.log('Copied image 2 successfully to', target2);
} catch (err) {
  console.error('Error copying image 2:', err);
}
