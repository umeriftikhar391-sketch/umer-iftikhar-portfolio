import assert from 'node:assert/strict';
import http from 'node:http';

const base = process.argv[2] || 'http://127.0.0.1:3003';
const get = async path => {
  const response = await fetch(new URL(path, base));
  return { response, text: (await response.text()).replace(/<!--.*?-->/g, '') };
};
const { response: sitemap, text: xml } = await get('/sitemap.xml');
assert.equal(sitemap.status, 200);
assert.doesNotMatch(xml, /<priority>|<changefreq>/);
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
assert.equal(urls.length, 20);
const modified = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(m => m[1]);
assert.equal(modified.length, urls.length);
for (const date of modified) assert.ok(Number.isFinite(Date.parse(date)));
const jsonLd = html => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .flatMap(m => JSON.parse(m[1]));
let homeHtml;
for (const url of urls) {
  const path = new URL(url).pathname;
  const { response, text } = await get(path);
  assert.equal(response.status, 200, path);
  assert.equal(response.headers.get('x-powered-by'), null);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(response.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
  assert.equal(response.headers.get('x-frame-options'), 'SAMEORIGIN');
  assert.match(response.headers.get('strict-transport-security'), /max-age=31536000/);
  assert.match(response.headers.get('cache-control'), /s-maxage=3600(?:,|$)/);
  const canonical = text.match(/<link rel="canonical" href="([^"]+)"/);
  assert.ok(canonical, `No canonical: ${path}`);
  assert.equal(new URL(canonical[1]).pathname, path);
  assert.equal(new URL(canonical[1]).origin, 'https://umeriftikhar.online');
  assert.equal((text.match(/<h1\b/g) || []).length, 1, path);
  assert.doesNotMatch(text, /name="keywords"/);
  const schema = jsonLd(text);
  const person = schema.find(e => e['@type'] === 'Person');
  assert.equal(person.email, 'umer.iftikhar391@gmail.com');
  assert.equal(person.telephone, '+923140209996');
  if (path === '/about') assert.ok(schema.some(e => e['@type'] === 'ProfilePage' && e.mainEntity['@id'].endsWith('/#person')));
  if (path.startsWith('/services/')) assert.ok(schema.some(e => e['@type'] === 'Service'));
  if (path.startsWith('/case-studies/')) assert.ok(schema.some(e => e['@type'] === 'Article'));
  if (path === '/') homeHtml = text;
}
const heading = homeHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)[1].replace(/<[^>]*>/g, '');
assert.match(heading, /Umer\s+Iftikhar\s+Performance Marketing Specialist/);
for (const stat of ['5+', '25+', '3,000+', '8x']) assert.ok(homeHtml.includes(`<span class="sr-only">${stat}</span>`), stat);
assert.doesNotMatch(homeHtml, /class="page-loader /);
const missing = await get('/this-page-does-not-exist-xyz');
assert.equal(missing.response.status, 404);
assert.doesNotMatch(missing.text, /rel="canonical"/);
assert.match(missing.text, /name="robots" content="[^"]*noindex/);
const unknownService = await get('/services/not-a-real-service');
assert.equal(unknownService.response.status, 404);
assert.doesNotMatch(unknownService.text, /rel="canonical"/);
const { response: robots, text: rules } = await get('/robots.txt');
assert.equal(robots.status, 200);
assert.match(rules, /Disallow: \/api\//);
assert.match(rules, /Sitemap: https:\/\/umeriftikhar.online\/sitemap.xml/);
assert.doesNotMatch(rules, /^Host:/m);
const redirect = await new Promise((resolve, reject) => {
  http.get(new URL('/services/seo?source=audit', base), { headers: { Host: 'www.umeriftikhar.online' } }, r => { r.resume(); resolve(r); }).on('error', reject);
});
assert.equal(redirect.statusCode, 301);
assert.equal(redirect.headers.location, 'https://umeriftikhar.online/services/seo?source=audit');
const key = await get('/indexnow-key.txt');
if (process.env.INDEXNOW_KEY) {
  assert.equal(key.response.status, 200);
  assert.equal(key.text, process.env.INDEXNOW_KEY);
  assert.equal(key.response.headers.get('x-robots-tag'), 'noindex');
} else assert.equal(key.response.status, 404);
console.log('Passed SEO checks across all 20 pages: canonical, H1, schema, headers, ISR, stats, 404, robots, sitemap, www redirect, and IndexNow key endpoint.');
