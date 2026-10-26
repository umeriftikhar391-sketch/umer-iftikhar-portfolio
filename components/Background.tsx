export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-white">
      {/* Soft blush wash behind the top of each page */}
      <div className="absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(60%_60%_at_85%_0%,var(--color-rose)_0%,transparent_70%)] opacity-70" />

      {/* Fine technical grid, faded out below the fold */}
      <div className="absolute inset-x-0 top-0 h-[720px] bg-[linear-gradient(to_right,rgb(15_23_42/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(15_23_42/0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
    </div>
  );
}
