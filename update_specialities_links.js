const fs = require('fs');
const path = require('path');

const specialitiesDir = path.resolve(__dirname, 'src/app/specialities');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file === 'SpecialityContent.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Let's replace the Book Now links inside the loop.
      // We look for: <Link href="/book" className="self-start bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg whitespace-nowrap hover:bg-sky-700 transition-colors text-sm">Book Now</Link>
      // Or similar. Let's make it flexible by replacing href="/book" to use `t.name` or `item.name`.
      // We can search for the map loop. If it's `].map((t) => (` or `].map(t => (` or `].map((item) => (`.
      // Let's do a regex replacement for <Link href="/book" in the Book Now button.
      // Usually it's:
      // <Link href="/book" className="self-start bg-sky-600 ...">Book Now</Link>
      
      // We check if the loop variable is `t` or `item`. We can look at what comes before.
      // Let's look at the mapping variable.
      let mapVar = 't';
      if (content.includes('.map((item)')) {
        mapVar = 'item';
      } else if (content.includes('.map(item =>')) {
        mapVar = 'item';
      }
      
      const targetStr = '<Link href="/book" className="self-start bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg whitespace-nowrap hover:bg-sky-700 transition-colors text-sm">Book Now</Link>';
      const targetStr2 = '<Link href="/book" className="self-start bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg whitespace-nowrap hover:bg-sky-750 transition-colors text-sm">Book Now</Link>';
      
      const replacement = `<Link href={\`/book?package=\${encodeURIComponent(${mapVar}.name)}\`} className="self-start bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg whitespace-nowrap hover:bg-sky-700 transition-colors text-sm">Book Now</Link>`;
      
      if (content.includes(targetStr)) {
        content = content.replace(targetStr, replacement);
        console.log(`Updated ${fullPath}`);
      } else if (content.includes(targetStr2)) {
        content = content.replace(targetStr2, replacement);
        console.log(`Updated (target2) ${fullPath}`);
      } else {
        // Fallback more generic match
        const genericTarget = /<Link\s+href="\/book"\s+className="self-start bg-sky-600([^"]*)">Book Now<\/Link>/g;
        if (genericTarget.test(content)) {
          content = content.replace(genericTarget, `<Link href={\`/book?package=\${encodeURIComponent(${mapVar}.name)}\`} className="self-start bg-sky-600$1">Book Now</Link>`);
          console.log(`Updated (generic) ${fullPath}`);
        } else {
          console.log(`No match found in ${fullPath}`);
        }
      }
      
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  });
}

processDirectory(specialitiesDir);
console.log('Finished updating speciality booking links.');
