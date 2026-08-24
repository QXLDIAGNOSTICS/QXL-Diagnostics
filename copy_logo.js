const fs = require('fs');
const path = require('path');

const srcPath = '/Users/afi/.gemini/antigravity-ide/brain/fd92d306-0114-4cb4-9fba-bfc9caa88c69/media__1787558845739.png';
const destPath = path.join(__dirname, 'public', 'images', 'qxl_mobile_logo.png');

try {
  const data = fs.readFileSync(srcPath);
  fs.writeFileSync(destPath, data);
  console.log('Successfully copied qxl_mobile_logo.png, size:', data.length);
} catch (err) {
  console.error('Error copying logo:', err);
}
