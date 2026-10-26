'use client';
import Link from 'next/link';
export default function BlogError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <section className="mx-auto min-h-[70vh] max-w-3xl px-6 pb-24 pt-40 text-center"><h1 className="text-4xl font-bold tracking-tight text-ink">Articles are temporarily unavailable</h1><p className="mt-6 leading-8 text-body">Please try again shortly. You can still explore the rest of the website.</p><div className="mt-8 flex flex-wrap justify-center gap-4"><button onClick={reset} className="min-h-12 rounded-xl bg-brand px-6 py-3 font-semibold text-white shadow-cta hover:bg-brand-hover">Try again</button><Link href="/" className="inline-flex min-h-12 items-center rounded-xl border border-brand/35 px-6 py-3 font-semibold hover:bg-blush">Back to home</Link></div></section>;
}
