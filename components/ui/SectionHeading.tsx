import Reveal from "@/components/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const center = align === "center";
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <Tag className="mt-5 text-balance text-[clamp(2.125rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.025em] text-ink">
        {title}
      </Tag>
      {intro && (
        <p className={`mt-5 text-pretty text-lg leading-8 text-body ${center ? "mx-auto" : ""} max-w-2xl`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
