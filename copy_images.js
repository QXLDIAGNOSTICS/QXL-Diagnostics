const fs = require('fs');
const path = require('path');

const srcDir = '/Users/afi/.gemini/antigravity-ide/brain/9e9e9b04-b828-44fc-a716-4e1bacb94336';
const destDir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
files.forEach(file => {
  if (file.endsWith('.png')) {
    if (file.includes('indian_lab_microscope')) {
      fs.copyFileSync(path.join(srcDir, file), path.join(destDir, 'indian_lab_microscope.png'));
    }
    if (file.includes('preventive_health_banner')) {
      fs.copyFileSync(path.join(srcDir, file), path.join(destDir, 'preventive_health_banner.png'));
    }
    if (file.includes('indian_doctor_fitness')) {
      fs.copyFileSync(path.join(srcDir, file), path.join(destDir, 'indian_doctor_fitness.png'));
    }
    if (file.includes('indian_home_collection')) {
      fs.copyFileSync(path.join(srcDir, file), path.join(destDir, 'indian_home_collection.png'));
    }
    if (file.includes('indian_female_doctor')) {
      fs.copyFileSync(path.join(srcDir, file), path.join(destDir, 'indian_female_doctor.png'));
    }
    if (file.includes('senior_care_hero')) {
      fs.copyFileSync(path.join(srcDir, file), path.join(destDir, 'senior_care_hero.png'));
    }
  }
});

console.log('Successfully copied all generated images to public/images!');
