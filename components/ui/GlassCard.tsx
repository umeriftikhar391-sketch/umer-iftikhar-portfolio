export default function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-colors duration-500 hover:border-red-500/40 ${className}`}
    >
      {children}
    </div>
  );
}
