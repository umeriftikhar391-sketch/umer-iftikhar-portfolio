import Button from "@/components/ui/Button";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center px-5 pt-32 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">Error 404</p>
        <h1 className="mt-5 text-5xl font-bold tracking-tight text-white sm:text-7xl">
          This page took a <span className="text-red-500">wrong turn.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-400">
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
