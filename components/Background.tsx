export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black">
      {/* Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:80px_80px] opacity-[0.08]" />

      {/* Right Red Glow: smaller and static on mobile to save GPU; drifts on larger screens */}
      <div className="bg-glow absolute right-[-160px] top-[60px] h-[360px] w-[360px] rounded-full bg-red-600/25 blur-[120px] md:right-[-250px] md:top-[80px] md:h-[700px] md:w-[700px] md:bg-red-600/30 md:blur-[180px]" />

      {/* Bottom Red Atmosphere */}
      <div className="absolute bottom-[-250px] left-[20%] hidden h-[400px] w-[600px] rounded-full bg-red-900/20 blur-[160px] md:block" />

      {/* Soft Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_85%)]" />

      {/* Subtle Grain */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,.3)_1px,transparent_1px)] bg-[size:4px_4px] opacity-[0.04]" />
    </div>
  );
}
