import sanitizeHtml from 'sanitize-html';
import { decode } from 'html-entities';
import { wordpressUrl } from './config';

export function plainText(html: string): string {
  return decode(sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })).replace(/\s+/g, ' ').trim();
}

export function publicLink(value: string): string {
  if (value.startsWith("#") || /^(mailto:|tel:)/i.test(value)) return value;
  const backend = wordpressUrl();
  if (!backend) return value;
  try {
    const url = new URL(value, backend.origin);
    if (url.origin !== backend.origin) return url.href;
    if (url.pathname.startsWith('/wp-content/uploads/')) return url.href;
    if (/\/(wp-admin|wp-json|wp-login\.php)(\/|$)/.test(url.pathname)) return '#';
    const path = url.pathname.split('/').filter(Boolean);
    const last = path.at(-1);
    if (!last) return '/blog';
    if (path.includes('category')) return `/blog/category/${encodeURIComponent(last)}`;
    if (path.includes('tag')) return `/blog/tag/${encodeURIComponent(last)}`;
    return `/blog/${encodeURIComponent(last)}${url.hash}`;
  } catch { return '#'; }
}

export function safeContent(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ['p','br','hr','h2','h3','h4','h5','h6','strong','em','b','i','s','del','mark','sub','sup','ul','ol','li','blockquote','pre','code','a','img','figure','figcaption','table','thead','tbody','tfoot','tr','th','td','div','span'],
    allowedAttributes: {
      a: ['href','title','rel'], img: ['src','alt','width','height','loading','decoding'],
      th: ['scope','colspan','rowspan'], td: ['colspan','rowspan'], ol: ['start'], code: ['class'],
      '*': ['id'],
    },
    allowedSchemes: ['https','http','mailto','tel'], allowProtocolRelative: false,
    transformTags: {
      h1: 'h2',
      a: (_tag, attrs) => ({ tagName: 'a', attribs: { ...attrs, href: publicLink(attrs.href || '#'), rel: 'noopener noreferrer' } }),
      img: (_tag, attrs) => {
        let src = attrs.src || '';
        try { src = new URL(src, wordpressUrl()?.origin).href; } catch { src = ''; }
        return { tagName: 'img', attribs: { ...attrs, src, alt: attrs.alt || '', loading: 'lazy', decoding: 'async' } };
      },
      table: (_tag, attrs) => ({ tagName: 'table', attribs: attrs }),
    },
    exclusiveFilter: frame => frame.tag === 'img' && !/^https?:\/\//.test(frame.attribs.src || ''),
  });
}
