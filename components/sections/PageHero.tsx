import Reveal from "@/components/Reveal";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

type Cta = { label: string; href: string; cta?: string };

export default function PageHero({
  eyebrow,
  title,
  highlight,
  intro,
  extraIntro,
  primary,
  secondary,
  breadcrumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  intro: string;
  extraIntro?: string;
  primary?: Cta;
  secondary?: Cta;
  breadcrumbs?: { name: string; path: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative px-5 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-40 lg:pb-24">
      <div className="mx-auto max-w-7xl">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className={`mt-8 grid gap-12 ${children ? "lg:grid-cols-[1.35fr_1fr] lg:items-end" : ""}`}>
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-6 text-balance text-[clamp(2.5rem,6.5vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink">
              {title} {highlight && <span className="text-brand">{highlight}</span>}
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-body sm:text-xl sm:leading-9">{intro}</p>
            {extraIntro && <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-body">{extraIntro}</p>}
            {(primary || secondary) && (
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
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
