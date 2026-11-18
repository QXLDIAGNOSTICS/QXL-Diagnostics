// Run server-side after deployment only. Pass only approved, changed, public URLs.
const host = 'www.qxldiagnostics.com'; // Match actual canonical configuration.
const key = process.env.INDEXNOW_KEY;
const urls = [...new Set(process.argv.slice(2))];
if (!key || !/^[0-9A-Fa-f-]{8,128}$/.test(key)) throw Error('Set a verified IndexNow key and publish its key file.');
if (!urls.length || urls.length > 10000) throw Error('Supply 1–10000 changed public URLs.');
for (const raw of urls) {
  const u = new URL(raw);
  if (u.protocol !== 'https:' || u.hostname !== host || u.search || u.hash || !/^\/(sexual-health|health-hub|packages|blog)(\/|$)/.test(u.pathname)) throw Error('Invalid public URL: '+raw);
}
const res = await fetch('https://api.indexnow.org/indexnow', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({host,key,keyLocation:`https://${host}/${key}.txt`,urlList:urls})});
console.log('IndexNow HTTP',res.status);
if (![200,202].includes(res.status)) process.exitCode=1;
