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
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500 sm:text-sm">{eyebrow}</p>
      <Tag className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
        {title}
      </Tag>
      {intro && (
        <p className={`mt-6 text-pretty text-base leading-8 text-gray-400 sm:text-lg ${center ? "mx-auto" : ""} max-w-2xl`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
