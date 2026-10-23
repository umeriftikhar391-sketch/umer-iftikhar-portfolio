import Reveal from "@/components/Reveal";
import type { Item } from "@/lib/services";

export default function ProcessSteps({ steps }: { steps: Item[] }) {
  return (
    <ol className="relative mt-14 space-y-4 before:absolute before:bottom-6 before:left-[27px] before:top-6 before:w-px before:bg-gradient-to-b before:from-red-500/60 before:via-white/10 before:to-transparent">
      {steps.map((step, i) => (
        <Reveal key={step.title} delay={i * 0.06}>
          <li className="relative flex gap-6 rounded-3xl border border-white/10 bg-black/40 p-5 transition hover:border-red-500/40 sm:p-6">
            <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-red-500/30 bg-black font-mono text-red-500">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-lg font-bold text-white sm:text-xl">{step.title}</h3>
              <p className="mt-2 leading-7 text-gray-400">{step.text}</p>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
