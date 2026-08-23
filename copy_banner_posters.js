const fs = require('fs');
const path = require('path');

const srcDir1 = path.join(__dirname, 'banner img ');
const srcDir2 = path.join(__dirname, 'qxl freedom sale poster');
const destDir = path.join(__dirname, 'public', 'images', 'posters');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

[srcDir1, srcDir2].forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      if (file.endsWith('.jpeg') || file.endsWith('.jpg') || file.endsWith('.png')) {
        const srcPath = path.join(dir, file);
        const cleanName = file.replace(/\s+/g, '_');
        const destPath = path.join(destDir, cleanName);
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${file} -> ${destPath}`);
      }
    });
  }
});
