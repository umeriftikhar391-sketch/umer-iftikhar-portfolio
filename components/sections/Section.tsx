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
    <section id={id} className={`relative scroll-mt-28 px-5 py-20 sm:px-6 lg:py-28 ${glow ? "border-y border-rose/70 bg-blush" : ""} ${className}`}>
      <div className="relative mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
