import fs from 'fs';
import path from 'path';

const raw = fs.readFileSync(path.resolve('public/test-guide.txt'), 'utf8');

const packages = [];
const blocks = raw.split(/(?=SELF-REQUEST POSSIBLE #|CONSULTATION RECOMMENDED #|DOCTOR-DIRECTED #)/g);

const introBlock = blocks.shift();

for (const block of blocks) {
  const matchId = block.match(/#(0[1-9]|[1-9][0-9])/);
  if (!matchId) continue;
  
  const id = matchId[0];
  let guidanceLevel = "SELF-REQUEST POSSIBLE";
  if (block.includes("CONSULTATION RECOMMENDED")) guidanceLevel = "CONSULTATION RECOMMENDED";
  if (block.includes("DOCTOR-DIRECTED")) guidanceLevel = "DOCTOR-DIRECTED";

  const lines = block.split('\n').map(l => l.trim()).filter(l => l);
  
  const titleIndex = lines.findIndex(l => l.includes(id)) + 1;
  const title = lines[titleIndex] || "";
  
  const descIndex = titleIndex + 1;
  const desc = lines[descIndex] || "";
  
  let mayHelpWhen = "";
  let mayHelpIndex = lines.findIndex(l => l === "MAY HELP WHEN");
  if (mayHelpIndex !== -1) {
    mayHelpWhen = lines[mayHelpIndex + 1];
  }
  
  let keyTests = [];
  let keyTestsIndex = lines.findIndex(l => l === "KEY TESTS / COMPONENTS");
  let beforeBookingIndex = lines.findIndex(l => l === "BEFORE BOOKING");
  
  if (keyTestsIndex !== -1 && beforeBookingIndex !== -1) {
    keyTests = lines.slice(keyTestsIndex + 1, beforeBookingIndex);
  }
  
  let beforeBooking = "";
  if (beforeBookingIndex !== -1) {
    beforeBooking = lines.slice(beforeBookingIndex + 1).join(' ');
  }

  packages.push({
    id,
    guidanceLevel,
    title,
    description: desc,
    mayHelpWhen,
    keyTests,
    beforeBooking
  });
}

fs.writeFileSync(path.resolve('src/lib/testGuideData.json'), JSON.stringify(packages, null, 2));
console.log("Successfully parsed test guide to JSON");
