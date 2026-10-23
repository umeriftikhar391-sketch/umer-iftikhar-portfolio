import Reveal from "@/components/Reveal";
import type { Item } from "@/lib/services";

export default function ItemGrid({ items, numbered, columns = 2 }: { items: Item[]; numbered?: boolean; columns?: 2 | 3 | 4 }) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <div className={`mt-14 grid gap-5 ${cols}`}>
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.06}>
          <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-500 hover:border-red-500/40 hover:bg-white/[0.05] sm:p-8">
            {numbered && <span className="font-mono text-sm text-red-500">{String(i + 1).padStart(2, "0")}</span>}
            <h3 className={`${numbered ? "mt-4" : ""} text-xl font-bold text-white`}>{item.title}</h3>
            <p className="mt-3 leading-7 text-gray-400">{item.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
