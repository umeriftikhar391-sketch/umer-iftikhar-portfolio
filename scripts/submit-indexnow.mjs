// Run only after deploying the matching site and verification endpoint.
const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://umeriftikhar.online');
const key = process.env.INDEXNOW_KEY;
if (!/^[a-zA-Z0-9-]{8,128}$/.test(key || '')) throw Error('Set INDEXNOW_KEY to an 8–128 character alphanumeric/hyphen ownership key.');
if (origin.protocol !== 'https:' || origin.pathname !== '/') throw Error('Site URL must be an HTTPS origin.');
const sitemap = await fetch(new URL('/sitemap.xml', origin), { signal: AbortSignal.timeout(15000) });
if (!sitemap.ok) throw Error(`Sitemap request failed: ${sitemap.status}`);
const xml = await sitemap.text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replaceAll('&amp;', '&'));
if (!urlList.length || urlList.length > 10000) throw Error('Unexpected sitemap URL count.');
for (const url of urlList) if (new URL(url).origin !== origin.origin) throw Error('Sitemap contains another origin.');
const keyLocation = new URL('/indexnow-key.txt', origin).href;
const payload = { host: origin.hostname, key, keyLocation, urlList };
if (process.argv.includes('--dry-run')) {
  console.log(JSON.stringify({ ...payload, key: '[redacted]' }, null, 2));
} else {
  const verification = await fetch(keyLocation, { signal: AbortSignal.timeout(15000) });
  if (!verification.ok || (await verification.text()).trim() !== key) throw Error('Deployed IndexNow ownership key does not match.');
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload), signal: AbortSignal.timeout(15000),
  });
  if (![200, 202].includes(response.status)) throw Error(`IndexNow returned ${response.status}`);
  console.log(`IndexNow accepted ${urlList.length} URLs (HTTP ${response.status}); indexing is not guaranteed.`);
}
