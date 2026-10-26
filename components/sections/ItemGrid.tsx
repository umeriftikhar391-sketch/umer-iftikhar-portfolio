import Reveal from "@/components/Reveal";
import type { Item } from "@/lib/services";

export default function ItemGrid({ items, numbered, columns = 2 }: { items: Item[]; numbered?: boolean; columns?: 2 | 3 | 4 }) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <div className={`mt-14 grid gap-5 ${cols}`}>
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.06}>
          <div className="group h-full rounded-2xl border border-line bg-white p-7 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lift sm:p-8">
            {numbered && <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-rose font-mono text-sm font-semibold text-brand-hover">{String(i + 1).padStart(2, "0")}</span>}
            <h3 className={`${numbered ? "mt-4" : ""} text-xl font-bold text-ink`}>{item.title}</h3>
            <p className="mt-3 leading-7 text-body">{item.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
