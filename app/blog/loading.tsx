export default function Loading() {
  return <section className="mx-auto max-w-7xl px-6 pb-24 pt-40" role="status" aria-label="Loading articles"><p className="text-body">Loading articles…</p><div className="mt-10 grid gap-6 md:grid-cols-3">{[1,2,3].map(n => <div key={n} className="h-80 animate-pulse rounded-2xl border border-line bg-blush motion-reduce:animate-none" />)}</div></section>;
}
