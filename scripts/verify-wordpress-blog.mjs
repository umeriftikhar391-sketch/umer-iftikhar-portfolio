import assert from 'node:assert/strict';
const base = process.argv[2] || 'http://127.0.0.1:3012';
const fixture = process.argv[3] || 'http://127.0.0.1:4011';
if (![base, fixture].every(s => ['127.0.0.1', 'localhost'].includes(new URL(s).hostname))) throw Error('Run this test only against local fixtures.');
const mode = value => fetch(`${fixture}/__fixture/mode?value=${value}`);
const read = async path => { const response = await fetch(base + path); return { response, text: await response.text() }; };
await mode('normal');
try {
  for (const path of ['/blog', '/blog?page=2', '/blog/category/marketing', '/blog/tag/meta-ads']) {
    const { response, text } = await read(path);
    assert.equal(response.status, 200, path);
    assert.ok(text.includes('href="/blog/meta-ads-strategy"') || path.includes('page=2'));
    assert.match(response.headers.get('cache-control'), /no-store/);
  }
  const listing = await read('/blog');
  assert.ok(listing.text.includes('Featured articles'));
  assert.ok(listing.text.includes('href="/blog?page=2"'));
  const { response, text } = await read('/blog/meta-ads-strategy');
  assert.equal(response.status, 200);
  assert.match(text, /<title>Meta Ads Strategy \| Umer Iftikhar<\/title>/);
  assert.ok(text.includes('rel="canonical" href="https://umeriftikhar.online/blog/meta-ads-strategy"'));
  assert.ok(text.includes('name="description" content="A WordPress SEO description."'));
  assert.equal((text.match(/<h1\b/g) || []).length, 1);
  const content = text.match(/<div class="blog-prose mt-12">([\s\S]*?)<\/div>/)[1];
  assert.ok(content.includes('<h2>Planning your campaign</h2>'));
  for (const bad of ['<script', 'onerror', 'javascript:', '<iframe']) assert.ok(!content.includes(bad), bad);
  for (const allowed of ['<strong>', '<figcaption>', '<table>', '<ul>']) assert.ok(content.includes(allowed));
  assert.ok(content.includes('href="/blog/article-2"'));
  assert.ok(content.includes('href="#metrics"'));
  assert.ok(text.includes('href="/services/meta-ads"'));
  assert.ok(text.includes('Featured campaign diagram'));
  const schemas = [...text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m => JSON.parse(m[1]));
  const article = schemas.find(s => s['@type'] === 'BlogPosting');
  assert.equal(article.url, 'https://umeriftikhar.online/blog/meta-ads-strategy');
  assert.equal(article.author.name, 'Umer Iftikhar');
  assert.equal(article.datePublished, '2026-10-20T10:00:00.000Z');
  assert.equal(article.dateModified, '2026-10-24T12:00:00.000Z');
  for (const path of ['/blog/no-such-post', '/blog/draft-only', '/blog/protected-only', '/blog/category/missing', '/blog/tag/missing', '/blog?page=0', '/blog?page=999', '/blog?page=1&page=2']) {
    const result = await read(path); assert.equal(result.response.status, 404, path); assert.ok(!result.text.includes('rel="canonical"'));
  }
  const sitemap = await read('/sitemap.xml');
  assert.ok(sitemap.text.includes('<loc>https://umeriftikhar.online/blog/meta-ads-strategy</loc>'));
  assert.ok(!sitemap.text.includes('/blog/draft-only'));
  assert.ok(!sitemap.text.includes(fixture));
  await mode('edited');
  assert.ok((await read('/blog/meta-ads-strategy')).text.includes('Meta Ads &amp; Growth Updated'));
  await mode('unpublished');
  assert.equal((await read('/blog/meta-ads-strategy')).response.status, 404);
  assert.ok(!(await read('/sitemap.xml')).text.includes('/blog/meta-ads-strategy'));
  await mode('error');
  const unavailable = await read('/blog/meta-ads-strategy');
  assert.equal(unavailable.response.status, 503);
  assert.ok(unavailable.text.includes('Articles are temporarily unavailable'));
  const fallbackSitemap = await read('/sitemap.xml');
  assert.equal(fallbackSitemap.response.status, 200);
  assert.ok(fallbackSitemap.text.includes('/services/meta-ads'));
  // Invalid form submission exercises validation without sending email.
  const form = await fetch(`${base}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ startedAt: Date.now() - 5000, name: '', email: 'invalid', message: '' }) });
  assert.equal(form.status, 422);
  const home = await read('/');
  assert.ok(home.text.includes('GTM-59B86S87'));
  assert.ok(home.text.includes('href="/blog"'));
  assert.equal(home.response.status, 200);
  console.log('WordPress fixture checks passed: listings, pagination, archives, sanitization, metadata/schema, real 404s, drafts/protected posts, edits/unpublishing, 503 fallback, sitemap, GTM, and form validation. No email was sent.');
} finally { await mode('normal'); }
