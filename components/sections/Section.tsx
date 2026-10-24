export default function Section({
  children,
  id,
  className = "",
  glow,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  glow?: "left" | "right";
}) {
  return (
    <section id={id} className={`relative scroll-mt-28 px-5 py-20 sm:px-6 lg:py-28 ${className}`}>
      {glow && (
        <div
          aria-hidden
          className={`pointer-events-none absolute top-0 hidden h-[420px] w-[420px] rounded-full bg-red-600/10 blur-[140px] md:block ${
            glow === "left" ? "left-0" : "right-0"
          }`}
        />
      )}
      <div className="relative mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
