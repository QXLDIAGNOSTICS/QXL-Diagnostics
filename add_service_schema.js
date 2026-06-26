const fs = require('fs');
const path = require('path');

const dir = './src/app/specialities';
const dirs = fs.readdirSync(dir, { withFileTypes: true }).filter(d => d.isDirectory());

for (const d of dirs) {
  const p = path.join(dir, d.name, 'page.tsx');
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    
    // Check if it already has schema to avoid duplicates
    if (content.includes('application/ld+json')) {
        continue;
    }

    const titleMatch = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const descMatch = content.match(/<p[^>]*text-.*100[^>]*>([^<]+)<\/p>/);
    
    const title = titleMatch ? titleMatch[1].trim() : `${d.name.charAt(0).toUpperCase() + d.name.slice(1)} Diagnostic Testing`;
    const description = descMatch ? descMatch[1].trim() : `Advanced ${d.name} diagnostic testing at QXL Diagnostics, Bengaluru.`;

    const schema = `
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "${title}",
            "provider": {
              "@type": "MedicalClinic",
              "name": "QXL Diagnostics",
              "image": "https://qxldiagnostics.com/image/Logo (1).png"
            },
            "areaServed": {
              "@type": "City",
              "name": "Bengaluru"
            },
            "description": "${description.replace(/"/g, '\\"')}",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock"
            }
          })
        }}
      />
    </div>
  );
}`;

    // Replace the last `    </div>\n  );\n}` with the schema
    const newContent = content.replace(/<\/div>\s*\);\s*}\s*$/, schema);
    fs.writeFileSync(p, newContent, 'utf8');
    console.log(`Added Service schema to ${d.name}`);
  }
}
