import { connection } from 'next/server';
import './blog.css';
export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  // Keep HTML request-rendered so cached 404s and old full pages cannot hide new posts.
  // The reusable API layer independently caches listing/taxonomy data for 60 seconds.
  await connection();
  return children;
}
