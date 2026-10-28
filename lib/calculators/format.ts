/**
 * Display formatting. Uses Intl.NumberFormat and keeps the visitor's input currency:
 * no exchange rates are applied anywhere in the calculator.
 */

export const PLACEHOLDER = "—";

export function formatCurrency(value: number | null | undefined, currency: string, opts: { compact?: boolean } = {}): string {
  if (typeof value !== "number" || !Number.isFinite(value)) return PLACEHOLDER;
  const abs = Math.abs(value);
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      notation: opts.compact && abs >= 100_000 ? "compact" : "standard",
      maximumFractionDigits: abs >= 1000 ? 0 : 2,
      minimumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${currency} ${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  }
}

export function formatNumber(value: number | null | undefined, maximumFractionDigits = 0): string {
  if (typeof value !== "number" || !Number.isFinite(value)) return PLACEHOLDER;
  return new Intl.NumberFormat("en-US", { maximumFractionDigits, notation: Math.abs(value) >= 10_000_000 ? "compact" : "standard" }).format(value);
}

/** Percentages are stored as human values (5 = 5%). */
export function formatPercent(value: number | null | undefined, maximumFractionDigits = 2): string {
  if (typeof value !== "number" || !Number.isFinite(value)) return PLACEHOLDER;
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value)}%`;
}

export function formatRoas(value: number | null | undefined): string {
  if (typeof value !== "number" || !Number.isFinite(value)) return PLACEHOLDER;
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(value)}x`;
}

/** Signed ROAS difference, e.g. "+0.85x" / "−0.40x". */
export function formatRoasDelta(value: number | null | undefined): string {
  if (typeof value !== "number" || !Number.isFinite(value)) return PLACEHOLDER;
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${formatRoas(Math.abs(value))}`;
}
