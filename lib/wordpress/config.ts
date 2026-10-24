/** Public read-only API configuration. No credentials are needed or accepted. */
export function wordpressUrl(): URL | null {
  const value = process.env.WORDPRESS_API_URL?.trim();
  if (!value) return null;
  const url = new URL(value);
  if (url.username || url.password || url.search || url.hash || !/\/wp-json\/wp\/v2\/?$/.test(url.pathname)) throw new Error('Invalid WORDPRESS_API_URL');
  if (url.protocol !== 'https:' && !(url.protocol === 'http:' && ['127.0.0.1', 'localhost'].includes(url.hostname))) throw new Error('WordPress requires HTTPS');
  url.pathname = url.pathname.replace(/\/$/, '') + '/';
  return url;
}
