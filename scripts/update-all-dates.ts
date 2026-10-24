import fs from "fs";
import path from "path";

const targetFiles = [
  "src/lib/blogsData.ts",
  "src/lib/seoPages/data/cbcTest.ts",
  "src/lib/seoPages/data/hba1cTest.ts",
  "src/lib/seoPages/data/thyroidTest.ts",
  "src/components/seo/SeoLandingPage.tsx",
  "src/components/ClientBlogFallback.tsx",
  "src/components/MedicalReviewerBadge.tsx",
  "src/components/blog/DoctorReviewerCard.tsx",
  "src/components/BlogSlider.tsx",
  "src/components/SymptomPageLayout.tsx",
  "src/app/blog/page.tsx",
  "src/app/blog/[id]/page.tsx",
  "src/app/knowledge-centre/page.tsx",
  "src/app/layout.tsx",
  "src/app/news/qxl-diagnostics-60-hospital-laboratory-partnerships-2028/page.tsx",
  "src/app/tests/food-sensitivity-test-bangalore/page.tsx",
];

// Add all health symptom pages
const healthDir = path.resolve(process.cwd(), "src/app/health");
if (fs.existsSync(healthDir)) {
  const healthSubdirs = fs.readdirSync(healthDir, { withFileTypes: true });
  for (const entry of healthSubdirs) {
    if (entry.isDirectory()) {
      const pagePath = path.join("src/app/health", entry.name, "page.tsx");
      if (fs.existsSync(path.resolve(process.cwd(), pagePath))) {
        targetFiles.push(pagePath);
      }
    }
  }
}

let totalReplacements = 0;

for (const relPath of targetFiles) {
  const fullPath = path.resolve(process.cwd(), relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${relPath}`);
    continue;
  }

  let content = fs.readFileSync(fullPath, "utf-8");
  let fileChanges = 0;

  // Replace October 23, 2026 with October 24, 2026
  if (content.includes("October 23, 2026")) {
    const count = (content.match(/October 23, 2026/g) || []).length;
    content = content.replace(/October 23, 2026/g, "October 24, 2026");
    fileChanges += count;
  }

  // Replace 2026-10-23 with 2026-10-24
  if (content.includes("2026-10-23")) {
    const count = (content.match(/2026-10-23/g) || []).length;
    content = content.replace(/2026-10-23/g, "2026-10-24");
    fileChanges += count;
  }

  if (fileChanges > 0) {
    fs.writeFileSync(fullPath, content, "utf-8");
    console.log(`Updated ${relPath} (${fileChanges} replacements)`);
    totalReplacements += fileChanges;
  }
}

console.log(`\n🎉 Successfully completed ${totalReplacements} date updates across ${targetFiles.length} files!`);
