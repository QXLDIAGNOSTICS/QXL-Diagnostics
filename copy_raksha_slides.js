const fs = require('fs');
const path = require('path');

const srcDir = '/Users/afi/.gemini/antigravity-ide/brain/01673230-e166-466a-988c-9db3668e9163';
const destDir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = [
  { src: 'media__1787508083196.jpg', dest: 'raksha_slide1.jpg' },
  { src: 'media__1787508083345.jpg', dest: 'raksha_slide2.jpg' },
  { src: 'media__1787508083498.jpg', dest: 'raksha_slide3.jpg' },
  { src: 'media__1787508084022.png', dest: 'raksha_slide4.png' }
];

files.forEach(({ src, dest }) => {
  const srcPath = path.join(srcDir, src);
  const destPath = path.join(destDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} -> ${destPath}`);
  } else {
    console.error(`Source file not found: ${srcPath}`);
  }
});
