const fs = require('fs');
const path = require('path');

const mappings = [
  { src: '/Users/afi/.gemini/antigravity-ide/brain/be5d20ac-535e-4e54-92b7-fc601cf300ec/freedom80_slide1_1786557619229.png', dest: 'freedom80_slide1.png' },
  { src: '/Users/afi/.gemini/antigravity-ide/brain/be5d20ac-535e-4e54-92b7-fc601cf300ec/freedom80_slide2_1786557699672.png', dest: 'freedom80_slide2.png' },
  { src: '/Users/afi/.gemini/antigravity-ide/brain/be5d20ac-535e-4e54-92b7-fc601cf300ec/freedom80_slide3_1786557729564.png', dest: 'freedom80_slide3.png' },
  { src: '/Users/afi/.gemini/antigravity-ide/brain/be5d20ac-535e-4e54-92b7-fc601cf300ec/freedom80_slide4_1786557767757.png', dest: 'freedom80_slide4.png' },
  { src: '/Users/afi/.gemini/antigravity-ide/brain/be5d20ac-535e-4e54-92b7-fc601cf300ec/freedom80_slide5_1786557792652.png', dest: 'freedom80_slide5.png' },
];

const destDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

mappings.forEach(m => {
  try {
    if (fs.existsSync(m.src)) {
      const destPath = path.join(destDir, m.dest);
      fs.copyFileSync(m.src, destPath);
      console.log(`Successfully copied ${m.src} to ${destPath}`);
    } else {
      console.error(`File not found: ${m.src}`);
    }
  } catch (err) {
    console.error(`Error copying ${m.src}:`, err.message);
  }
});
