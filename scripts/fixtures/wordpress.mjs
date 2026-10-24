// Public REST API fixture. Contains deliberately hostile HTML and unpublished posts.
import http from 'node:http';
const port = Number(process.env.PORT || 4010);
const origin = `http://127.0.0.1:${port}`;
let mode = 'normal';
const category = { id: 1, slug: 'marketing', name: 'Marketing &amp; Growth', taxonomy: 'category', description: '<p>Practical marketing advice.</p>', count: 12 };
const tag = { id: 2, slug: 'meta-ads', name: 'Meta Ads', taxonomy: 'post_tag', count: 12 };
const post = n => ({
  id: n, slug: n === 1 ? 'meta-ads-strategy' : `article-${n}`, status: n === 50 ? 'draft' : 'publish',
  date_gmt: '2026-10-20T10:00:00', modified_gmt: '2026-10-24T12:00:00', sticky: n === 1,
  title: { rendered: n === 1 ? (mode === 'edited' ? 'Meta Ads &amp; Growth Updated' : 'Meta Ads &amp; Growth') : `Article ${n}` }, excerpt: { rendered: '<p>A clear &amp; useful introduction.</p>', protected: n === 51 },
  content: { protected: n === 51, rendered: `<h1>Planning your campaign</h1><p>Safe content <strong>in bold</strong>.</p><script>alert('unsafe')</script><img src="${origin}/wp-content/uploads/test.png" alt="Campaign diagram" onerror="alert(1)"><a href="javascript:alert(1)">Bad link</a><a href="${origin}/2026/10/article-2/">Internal article</a><a href="#metrics">Jump to metrics</a><h2 id="metrics">Metrics</h2><figure><figcaption>A useful caption.</figcaption></figure><ul><li>First point</li></ul><table><tbody><tr><th scope="col">Metric</th><td>Leads</td></tr></tbody></table>` },
  categories: [1], tags: [2], _embedded: { author: [{ name: 'Umer Iftikhar' }], 'wp:featuredmedia': [{ source_url: `${origin}/wp-content/uploads/test.png`, alt_text: 'Featured campaign diagram', media_details: { width: 800, height: 450 } }], 'wp:term': [[category], [tag]] },
  yoast_head_json: { title: n === 1 ? 'Meta Ads Strategy | Umer Iftikhar' : `Article ${n}`, description: 'A WordPress SEO description.', og_title: 'Meta Ads social title', og_description: 'A social description.' },
});
const server = http.createServer((req, res) => {
  const url = new URL(req.url, origin);
  if (url.pathname === '/__fixture/mode') { mode = url.searchParams.get('value') || 'normal'; res.end('ok'); return; }
  if (url.pathname === '/wp-content/uploads/test.png') {
    res.setHeader('Content-Type', 'image/png');
    res.end(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j9FAAAAAASUVORK5CYII=', 'base64')); return;
  }
  res.setHeader('Content-Type', 'application/json');
  if (mode === 'error') { res.writeHead(503); res.end(JSON.stringify({ code: 'unavailable' })); return; }
  if (url.pathname.endsWith('/posts')) {
    if (url.searchParams.get('status') !== 'publish' || url.searchParams.get('context') !== 'view') { res.writeHead(400); res.end('{}'); return; }
    let posts = Array.from({ length: 12 }, (_, i) => post(i + 1));
    if (mode === 'unpublished') posts = posts.filter(p => p.id !== 1);
    if (mode === 'empty') posts = [];
    if (url.searchParams.get('sticky') === 'true') posts = posts.filter(p => p.sticky);
    const slug = url.searchParams.get('slug');
    if (slug) {
      if (slug === 'draft-only') posts = [{...post(50), slug: 'draft-only'}];
      else if (slug === 'protected-only') posts = [{...post(51), slug: 'protected-only'}];
      else posts = posts.filter(p => p.slug === slug);
    }
    const exclude = Number(url.searchParams.get('exclude'));
    if (exclude) posts = posts.filter(p => p.id !== exclude);
    const perPage = Number(url.searchParams.get('per_page') || 9), page = Number(url.searchParams.get('page') || 1);
    res.setHeader('X-WP-Total', posts.length); res.setHeader('X-WP-TotalPages', Math.ceil(posts.length / perPage));
    if (page > 1 && page > Math.ceil(posts.length / perPage)) { res.writeHead(400); res.end(JSON.stringify({ code: 'rest_post_invalid_page_number' })); return; }
    res.end(JSON.stringify(posts.slice((page - 1) * perPage, page * perPage))); return;
  }
  if (url.pathname.endsWith('/categories') || url.pathname.endsWith('/tags')) {
    const term = url.pathname.endsWith('/categories') ? category : tag;
    res.setHeader('X-WP-Total', 1); res.setHeader('X-WP-TotalPages', 1);
    res.end(JSON.stringify(!url.searchParams.get('slug') || url.searchParams.get('slug') === term.slug ? [term] : [])); return;
  }
  res.writeHead(404); res.end('[]');
});
server.listen(port, '127.0.0.1', () => console.log(`WordPress fixture listening on ${port}`));
