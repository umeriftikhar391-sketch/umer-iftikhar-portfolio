export default function CaseCover({ monogram, industry, className = "" }: { monogram: string; industry: string; className?: string }) {
  return (
    <div
      aria-hidden
      className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-black ${className}`}
    >
      <div className="absolute -right-10 -top-10 h-2/3 w-2/3 rounded-full bg-red-600/30 blur-[80px] transition-transform duration-700 group-hover:scale-125" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <span className="relative text-7xl font-bold tracking-tighter text-white/90 sm:text-8xl">
        {monogram}
        <span className="text-red-500">.</span>
      </span>
      <span className="absolute bottom-4 left-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">{industry}</span>
    </div>
  );
}
