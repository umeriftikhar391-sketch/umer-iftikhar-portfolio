'use client';
import Link from 'next/link';
export default function BlogError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <section className="mx-auto min-h-[70vh] max-w-3xl px-6 pb-24 pt-40 text-center"><h1 className="text-4xl font-bold">Articles are temporarily unavailable</h1><p className="mt-6 leading-8 text-gray-400">Please try again shortly. You can still explore the rest of the website.</p><div className="mt-8 flex flex-wrap justify-center gap-4"><button onClick={reset} className="rounded-full bg-red-600 px-6 py-3 font-semibold">Try again</button><Link href="/" className="rounded-full border border-white/20 px-6 py-3">Back to home</Link></div></section>;
}
