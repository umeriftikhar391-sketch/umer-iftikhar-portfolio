export default function Loading() {
  return <section className="mx-auto max-w-7xl px-6 pb-24 pt-40" role="status" aria-label="Loading articles"><p className="text-gray-400">Loading articles…</p><div className="mt-10 grid gap-6 md:grid-cols-3">{[1,2,3].map(n => <div key={n} className="h-80 animate-pulse rounded-3xl border border-white/10 bg-white/5 motion-reduce:animate-none" />)}</div></section>;
}
