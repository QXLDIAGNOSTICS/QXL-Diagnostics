const fs = require('fs');
const path = require('path');

const srcDir = '/Users/afi/.gemini/antigravity-ide/brain/fd92d306-0114-4cb4-9fba-bfc9caa88c69';
const destDir = path.join(__dirname, 'public', 'images', 'mobile');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
files.forEach(file => {
  if (file.startsWith('blood_sample_tube_') && file.endsWith('.png')) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, 'blood_sample_tube.png'));
    console.log('Copied blood_sample_tube.png');
  }
  if (file.startsWith('hair_fall_checkup_') && file.endsWith('.png')) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, 'hair_fall_checkup.png'));
    console.log('Copied hair_fall_checkup.png');
  }
});
