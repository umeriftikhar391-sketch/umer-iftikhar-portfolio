import Reveal from "@/components/Reveal";
import type { Item } from "@/lib/services";

export default function ProcessSteps({ steps }: { steps: Item[] }) {
  return (
    <ol className="relative mt-14 space-y-4 before:absolute before:bottom-6 before:left-[27px] before:top-6 before:w-px before:bg-gradient-to-b before:from-brand/40 before:via-line before:to-transparent">
      {steps.map((step, i) => (
        <Reveal key={step.title} delay={i * 0.06}>
          <li className="relative flex gap-5 rounded-2xl border border-line bg-white p-5 shadow-card transition duration-300 hover:border-brand/30 sm:gap-6 sm:p-6">
            <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-rose font-mono font-semibold text-brand-hover">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-lg font-bold text-ink sm:text-xl">{step.title}</h3>
              <p className="mt-2 leading-7 text-body">{step.text}</p>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
