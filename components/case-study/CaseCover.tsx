export default function CaseCover({ monogram, industry, className = "" }: { monogram: string; industry: string; className?: string }) {
  return (
    <div
      aria-hidden
      className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-line bg-blush ${className}`}
    >
      <div className="absolute -right-10 -top-10 h-2/3 w-2/3 rounded-full bg-coral/25 blur-[80px] transition-transform duration-700 group-hover:scale-125" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(15_23_42/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(15_23_42/0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <span className="relative text-7xl font-bold tracking-tighter text-ink sm:text-8xl">
        {monogram}
        <span className="text-brand">.</span>
      </span>
      <span className="absolute bottom-4 left-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{industry}</span>
    </div>
  );
}
