import Reveal from "@/components/Reveal";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

type Cta = { label: string; href: string; cta?: string };

export default function PageHero({
  eyebrow,
  title,
  highlight,
  intro,
  primary,
  secondary,
  breadcrumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  intro: string;
  primary?: Cta;
  secondary?: Cta;
  breadcrumbs?: { name: string; path: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative px-5 pb-20 pt-36 sm:px-6 sm:pt-44 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className={`mt-8 grid gap-12 ${children ? "lg:grid-cols-[1.35fr_1fr] lg:items-end" : ""}`}>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500 sm:text-sm">{eyebrow}</p>
            <h1 className="mt-6 text-balance text-5xl font-bold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {title} {highlight && <span className="text-red-500">{highlight}</span>}
            </h1>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-gray-400">{intro}</p>
            {(primary || secondary) && (
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                {primary && (
                  <Button href={primary.href} cta={primary.cta}>
                    {primary.label}
                  </Button>
                )}
                {secondary && (
                  <Button href={secondary.href} cta={secondary.cta} variant="secondary">
                    {secondary.label}
                  </Button>
                )}
              </div>
            )}
          </Reveal>
          {children && <Reveal delay={0.2}>{children}</Reveal>}
        </div>
      </div>
    </section>
  );
}
