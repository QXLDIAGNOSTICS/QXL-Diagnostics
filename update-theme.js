const fs = require("fs");
const path = require("path");

const dirs = [
  "bone-disorders", "cardiology", "endocrinology", "gastroenterology", 
  "hematology", "infectious-diseases", "neurology", "oncology", 
  "urology", "womens-health"
];

const colorRegex = /\b(text|bg|border|from|to|via)-(red|indigo|rose|purple|emerald|teal|blue|cyan|orange|yellow|amber|green|pink|fuchsia)-(\d+)\b/g;

dirs.forEach(dir => {
  const filePath = path.join("src/app/specialities", dir, "SpecialityContent.tsx");
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, "utf8");
    
    // Replace all tailwind colors with sky
    content = content.replace(colorRegex, "$1-sky-$3");
    
    // Replace hover:text/bg/border etc.
    const hoverColorRegex = /\b(hover|focus|active):(text|bg|border)-(red|indigo|rose|purple|emerald|teal|blue|cyan|orange|yellow|amber|green|pink|fuchsia)-(\d+)\b/g;
    content = content.replace(hoverColorRegex, "$1:$2-sky-$4");
    
    // Clean up hex code injections in style tags
    content = content.replace(/style=\{\{\s*color:\s*'(#[a-fA-F0-9]{6})'\s*\}\}/g, `style={{ color: '#0284c7' }}`);
    
    // Update the hero section to use glassmorphism spatial look instead of flat gradients
    // Replace something like: className="bg-gradient-to-r from-sky-700 to-sky-950 text-white ...
    content = content.replace(/bg-gradient-to-r\s+from-sky-[0-9]+\s+to-sky-[0-9]+\s+text-white/g, "glass-panel text-[#0c4a6e]");
    
    // Make sure h1 texts in the hero are dark instead of white
    content = content.replace(/<h1 className="([^"]*)text-white([^"]*)">/g, `<h1 className="$1text-[#0c4a6e]$2">`);
    content = content.replace(/<p className="([^"]*)text-sky-[12]00([^"]*)">/g, `<p className="$1text-[#0369a1]$2">`);
    
    // Make the sub-banners match the glass theme
    content = content.replace(/bg-gradient-to-br\s+from-sky-700\s+to-sky-900\s+text-white/g, "glass text-[#0c4a6e]");
    content = content.replace(/bg-gradient-to-r\s+from-sky-700\s+to-sky-900/g, "glass");
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${dir}`);
  }
});
