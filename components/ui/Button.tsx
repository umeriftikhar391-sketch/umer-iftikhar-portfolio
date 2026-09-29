import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-red-600 text-white hover:bg-red-500 shadow-[0_10px_40px_-10px_rgba(239,68,68,0.6)]",
  secondary: "border border-white/25 text-white hover:bg-white hover:text-black",
  ghost: "text-white/80 hover:text-white underline-offset-4 hover:underline px-0",
};

export default function Button({
  href,
  children,
  variant = "primary",
  cta,
  external,
  className = "",
  arrow = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  /** Label pushed to analytics as a cta_click event. */
  cta?: string;
  external?: boolean;
  className?: string;
  arrow?: boolean;
}) {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-full ${
    variant === "ghost" ? "" : "px-7 py-4"
  } text-sm sm:text-base font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500 ${styles[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowUpRight
          aria-hidden
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if (external || /^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a
        href={href}
        className={classes}
        data-cta={cta}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} data-cta={cta}>
      {content}
    </Link>
  );
}
