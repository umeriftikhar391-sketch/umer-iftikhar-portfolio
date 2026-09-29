import type { GalleryKind } from "@/lib/case-studies";

const line = "h-2 rounded-full bg-white/10";

function Ads() {
  return (
    <div className="mx-auto w-[70%] rounded-2xl border border-white/10 bg-black/60 p-3">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-red-500/70" />
        <div className="space-y-1">
          <div className={`${line} w-16`} />
          <div className="h-1.5 w-10 rounded-full bg-white/5" />
        </div>
      </div>
      <div className="mt-3 aspect-[4/3] rounded-xl bg-gradient-to-br from-red-600/60 via-red-900/40 to-black" />
      <div className="mt-3 flex items-center justify-between">
        <div className={`${line} w-20`} />
        <div className="rounded-md bg-white/90 px-2 py-1 text-[8px] font-bold text-black">SHOP NOW</div>
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="mx-auto w-[80%] space-y-3">
      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-2">
        <div className="h-3 w-3 rounded-full border-2 border-white/40" />
        <div className={`${line} w-28`} />
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className={`rounded-xl border p-3 ${i === 0 ? "border-red-500/50 bg-red-500/10" : "border-white/5 bg-white/[0.03]"}`}>
          <div className={`h-2 w-24 rounded-full ${i === 0 ? "bg-red-400/80" : "bg-white/20"}`} />
          <div className={`${line} mt-2 w-full`} />
          <div className={`${line} mt-1.5 w-2/3`} />
        </div>
      ))}
    </div>
  );
}

function Store() {
  return (
    <div className="mx-auto w-[82%] rounded-2xl border border-white/10 bg-black/60 p-3">
      <div className="flex items-center justify-between">
        <div className="h-2.5 w-12 rounded-full bg-red-500/80" />
        <div className="flex gap-1.5">{[0, 1, 2].map((i) => <div key={i} className="h-1.5 w-6 rounded-full bg-white/15" />)}</div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i}>
            <div className={`aspect-square rounded-lg ${i % 3 === 1 ? "bg-gradient-to-br from-red-500/50 to-red-950/40" : "bg-white/[0.07]"}`} />
            <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-white/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Analytics() {
  const bars = [35, 48, 42, 60, 55, 72, 68, 85];
  return (
    <div className="mx-auto w-[82%] rounded-2xl border border-white/10 bg-black/60 p-4">
      <div className="flex gap-4">
        {["w-10", "w-8", "w-12"].map((w, i) => (
          <div key={i} className="space-y-1">
            <div className="h-1.5 w-8 rounded-full bg-white/15" />
            <div className={`h-3 ${w} rounded-full ${i === 0 ? "bg-red-500/80" : "bg-white/30"}`} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex h-24 items-end gap-2">
        {bars.map((h, i) => (
          <div key={i} className={`flex-1 rounded-t ${i === bars.length - 1 ? "bg-red-500" : "bg-white/15"}`} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function Funnel() {
  return (
    <div className="mx-auto flex w-[80%] flex-col items-center gap-2">
      {[100, 78, 56, 36].map((w, i) => (
        <div
          key={w}
          className={`flex h-9 items-center justify-center rounded-lg text-[9px] font-semibold uppercase tracking-widest ${
            i === 3 ? "bg-red-500 text-white" : "bg-white/[0.08] text-white/50"
          }`}
          style={{ width: `${w}%` }}
        >
          {["Reach", "Engage", "Consider", "Convert"][i]}
        </div>
      ))}
    </div>
  );
}

function Leads() {
  return (
    <div className="mx-auto w-[64%] space-y-2.5 rounded-2xl border border-white/10 bg-black/60 p-4">
      <div className="h-2.5 w-24 rounded-full bg-white/40" />
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-7 rounded-lg border border-white/10 bg-white/[0.04]" />
      ))}
      <div className="flex h-8 items-center justify-center rounded-lg bg-red-600 text-[9px] font-bold uppercase tracking-widest text-white">Submit</div>
    </div>
  );
}

function Email() {
  return (
    <div className="mx-auto w-[70%] rounded-2xl border border-white/10 bg-black/60 p-4">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <div className="h-5 w-5 rounded-full bg-red-500/70" />
        <div className={`${line} w-24`} />
      </div>
      <div className="mt-3 h-14 rounded-lg bg-gradient-to-r from-red-600/40 to-transparent" />
      <div className={`${line} mt-3 w-full`} />
      <div className={`${line} mt-1.5 w-5/6`} />
      <div className={`${line} mt-1.5 w-2/3`} />
      <div className="mt-3 h-6 w-20 rounded-md bg-red-600" />
    </div>
  );
}

function Mobile() {
  return (
    <div className="mx-auto w-[38%] rounded-[1.6rem] border-2 border-white/15 bg-black p-2">
      <div className="mx-auto h-1 w-8 rounded-full bg-white/20" />
      <div className="mt-2 aspect-square rounded-xl bg-gradient-to-br from-red-500/60 to-red-950/30" />
      <div className={`${line} mt-2 w-3/4`} />
      <div className="mt-1.5 h-2 w-1/3 rounded-full bg-red-400/70" />
      <div className="mt-2 grid grid-cols-4 gap-1">{[0, 1, 2, 3].map((i) => <div key={i} className="h-3 rounded bg-white/10" />)}</div>
      <div className="mt-2 h-5 rounded-md bg-red-600" />
    </div>
  );
}

const visuals: Record<GalleryKind, () => React.JSX.Element> = {
  ads: Ads,
  search: Search,
  store: Store,
  analytics: Analytics,
  funnel: Funnel,
  leads: Leads,
  email: Email,
  mobile: Mobile,
};

export default function CaseVisual({ kind, className = "" }: { kind: GalleryKind; className?: string }) {
  const Visual = visuals[kind];
  return (
    <div
      aria-hidden
      className={`relative flex aspect-[4/3] items-center overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.18),transparent_60%)] bg-white/[0.02] ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className="relative w-full">
        <Visual />
      </div>
    </div>
  );
}
