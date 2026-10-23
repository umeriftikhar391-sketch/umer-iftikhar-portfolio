import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const copy = JSON.parse(readFileSync(new URL('../lib/service-page-copy.json', import.meta.url)));
const base = process.argv[2] || 'http://127.0.0.1:3006';
const decode = text => text.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, '').replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&#39;', "'").replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replace(/\s+/g, ' ').trim();
const metadata = html => Object.fromEntries([...html.matchAll(/<meta\s+(?:name|property)="([^"]+)" content="([^"]*)"/g)].map(m => [m[1], decode(m[2])]));
const titles = new Set(), descriptions = new Set();
for (const [slug, page] of Object.entries(copy)) {
  const path = `/services/${slug}`;
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  const visible = decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, ''));
  const meta = metadata(html);
  const title = decode(html.match(/<title>(.*?)<\/title>/)[1]);
  assert.equal(title, page.meta['SEO title']);
  assert.equal(meta.description, page.meta['Meta description']);
  assert.equal(meta['og:title'], page.meta['Open Graph title']);
  assert.equal(meta['og:description'], page.meta['Open Graph description']);
  assert.equal(meta['og:image:alt'], page.meta['Social image alt text']);
  assert.equal(meta['twitter:title'], page.meta['Open Graph title']);
  assert.equal(meta['twitter:description'], page.meta['Open Graph description']);
  assert.ok(!titles.has(title), `Duplicate title: ${title}`); titles.add(title);
  assert.ok(!descriptions.has(meta.description)); descriptions.add(meta.description);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal(decode(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)[1]), page.sections[0].title);
  assert.equal(new URL(html.match(/<link rel="canonical" href="([^"]+)"/)[1]).pathname, path);
  assert.ok(!meta.robots.includes('noindex'));
  for (const section of page.sections) {
    assert.ok(visible.includes(section.title), `Missing heading: ${section.title}`);
    for (const node of section.nodes) {
      assert.ok(visible.includes(node.text), `${slug}: missing copy ${node.text}`);
      if (node.title) assert.ok(visible.includes(node.title), `${slug}: missing card ${node.title}`);
    }
    for (const cta of [section.primary, section.secondary, section.cta].filter(Boolean)) {
      assert.ok(visible.includes(cta.label)); assert.ok(html.includes(`href="${cta.href}"`));
    }
  }
  for (const link of page.links) assert.ok(html.includes(`href="${link.href}"`), `${slug} missing internal link ${link.text}: ${link.href}`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m => JSON.parse(m[1]));
  for (const type of ['Person', 'ProfessionalService', 'WebSite', 'Service', 'WebPage', 'BreadcrumbList', 'FAQPage']) assert.equal(schemas.filter(s => s['@type'] === type).length, 1, `${slug}: ${type}`);
  const url = `https://umeriftikhar.online${path}`;
  const web = schemas.find(s => s['@type'] === 'WebPage');
  assert.equal(web['@id'], `${url}#webpage`);
  assert.equal(web.about['@id'], `${url}#service`);
  assert.equal(web.breadcrumb['@id'], `${url}#breadcrumb`);
  const service = schemas.find(s => s['@type'] === 'Service');
  assert.equal(service['@id'], `${url}#service`);
  assert.equal(service.name, page.schemaName);
  assert.equal(service.serviceType, page.serviceType);
  assert.equal(service.description, page.meta['Meta description']);
  const crumbs = schemas.find(s => s['@type'] === 'BreadcrumbList');
  assert.equal(crumbs['@id'], `${url}#breadcrumb`);
  assert.equal(crumbs.itemListElement.at(-1).item, url);
  const catalog = schemas.find(s => s['@type'] === 'ProfessionalService').hasOfferCatalog;
  assert.ok(catalog.itemListElement.some(o => o.itemOffered['@id'] === service['@id']));
  const faq = schemas.find(s => s['@type'] === 'FAQPage');
  assert.equal(faq['@id'], `${url}#faq`);
  const details = [...html.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/g)].map(m => m[1]);
  assert.equal(details.length, slug === 'ai-automation' ? 7 : 8);
  for (let i = 0; i < page.faqs.length; i++) {
    assert.equal(decode(details[i].match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/)[1]), page.faqs[i].q);
    assert.equal(decode(details[i].match(/<p\b[^>]*>([\s\S]*?)<\/p>/)[1]), page.faqs[i].a);
    assert.equal(faq.mainEntity[i].name, page.faqs[i].q);
    assert.equal(faq.mainEntity[i].acceptedAnswer.text, page.faqs[i].a);
  }
  assert.ok(html.includes(`<option value="${page.name.replaceAll('&', '&amp;')}" selected="">`), `${slug}: service preselection`);
  assert.ok(visible.includes('No spam. Your details are only used to reply to your inquiry.'));
  for (const hidden of ['Implementation note:', 'Current → Replacement:', 'Conditional block', 'Conditional FAQ', 'The questions and answers are listed once', 'characters']) assert.ok(!visible.includes(hidden), `${slug}: leaked editorial notes ${hidden}`);
  if (slug === 'ai-automation') for (const claim of ['AI chatbot development services', 'WhatsApp Business automation', 'WhatsApp Business', 'Can AI answer customer questions']) assert.ok(!visible.includes(claim));
  const proof = html.match(/<section\b[^>]*id="case-studies"[\s\S]*?<\/section>/)[0];
  if (['google-ads', 'web-development'].includes(slug)) assert.ok(!proof.includes('/case-studies/gulkhan-pk'));
  if (slug === 'ai-automation') assert.ok(!proof.includes('/case-studies/gul-khan'));
  const image = await fetch(new URL(meta['og:image']).pathname ? `${base}${new URL(meta['og:image']).pathname}` : '');
  assert.equal(image.status, 200, `${slug}: social image`);
  assert.match(image.headers.get('content-type'), /^image\/png/);
  const png = Buffer.from(await image.arrayBuffer());
  assert.equal(png.readUInt32BE(16), 1200); assert.equal(png.readUInt32BE(20), 630);
}
console.log('All eight service packages passed: full copy, 63 FAQs, metadata, social images, internal links, schema graph, form defaults, and conditional exclusions.');
