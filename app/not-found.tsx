import Button from "@/components/ui/Button";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center px-5 pt-32 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-5 text-[clamp(2.75rem,7vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink">
          This page took a <span className="text-brand">wrong turn.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-body">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button href="/">Back to Home</Button>
          <Button href="/services" variant="secondary">Explore Services</Button>
        </div>
      </div>
    </section>
  );
}
