import assert from 'node:assert/strict';
const base = process.argv[2] || 'http://127.0.0.1:3005';
const response = await fetch(`${base}/services/meta-ads`);
assert.equal(response.status, 200);
const html = await response.text();
const decode = text => text.replace(/<!--.*?-->/g, '').replace(/<[^>]+>/g, '').replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&#39;', "'").replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replace(/\s+/g, ' ').trim();
assert.equal(decode(html.match(/<title>(.*?)<\/title>/)[1]), 'Meta Ads Expert | Facebook & Instagram Ads | Umer Iftikhar');
assert.equal(decode(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)[1]), 'Meta Ads Expert for Ecommerce Sales and Lead Generation');
const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m => JSON.parse(m[1]));
const service = schemas.find(s => s['@type'] === 'Service');
assert.equal(service['@id'], 'https://umeriftikhar.online/services/meta-ads#service');
assert.equal(service.serviceType, 'Meta advertising management');
assert.equal(service.provider['@id'], 'https://umeriftikhar.online/#business');
assert.equal(service.description, 'Umer Iftikhar is a Meta ads expert in Karachi managing Facebook and Instagram ads for ecommerce sales and lead generation, with tracking checks and reporting.');
for (const type of ['Person', 'ProfessionalService']) {
  assert.equal(schemas.filter(s => s['@type'] === type).length, 1);
  assert.equal(schemas.find(s => s['@type'] === type).address.addressLocality, 'Karachi');
}
const faq = schemas.find(s => s['@type'] === 'FAQPage');
assert.equal(faq.mainEntity.length, 8);
const details = [...html.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/g)].map(m => m[1]);
assert.equal(details.length, 8);
for (let i = 0; i < details.length; i++) {
  assert.equal(decode(details[i].match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/)[1]), faq.mainEntity[i].name);
  assert.equal(decode(details[i].match(/<p\b[^>]*>([\s\S]*?)<\/p>/)[1]), faq.mainEntity[i].acceptedAnswer.text);
}
for (const text of ['Included in Meta Ads management', 'How I measure Meta Ads performance', 'What to expect', 'Discuss Your Meta Ads', 'See Meta Ads Case Studies', 'Start With an Account Review', 'Talk to a Meta ads expert about your campaigns', 'Send Project Details']) assert.ok(decode(html).includes(text), text);
for (const path of ['/services/web-development', '/services/analytics-tracking', '/services/shopify-development', '/services/conversion-optimization', '/services/google-ads', '/case-studies/building-block', '/case-studies/khatkaar', '/case-studies/decordreams', '/case-studies/petsinn', '/case-studies']) assert.ok(html.includes(`href="${path}"`), path);
assert.match(html, /<option value="Meta Ads" selected="">Meta Ads<\/option>/);
const visible = decode(html.split('<script>self.__next_f')[0]);
for (const old of ['Turn Attention Into Revenue', 'Lower cost per lead', 'Scalable ROAS', 'Predictable acquisition cost', 'four to eight weeks', 'Working notes', 'Facts to confirm before publishing']) assert.ok(!visible.includes(old), old);
console.log('Meta Ads replacement checks passed: copy, links, eight matching FAQs, schema, metadata, and preselected service.');
