import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-cta hover:bg-brand-hover active:bg-brand-hover",
  secondary: "border border-brand/35 bg-white text-ink hover:border-brand hover:bg-blush hover:text-brand-hover",
  ghost: "text-ink hover:text-brand-hover underline-offset-4 hover:underline px-0",
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
  const classes = `group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl ${
    variant === "ghost" ? "" : "px-6 py-3"
  } text-base font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover ${styles[variant]} ${className}`;
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
