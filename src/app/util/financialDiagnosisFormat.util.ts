/**
 * Formatting and calculation helpers for the Financial Diagnosis report
 * (Dalgo city-brief "Download PDF"). Kept framework-free so they can be
 * unit tested and reused from both the report component and its service.
 *
 * Number formatting follows the convention already used elsewhere in this
 * app for ULB financial reports (see `dashboard/report/inr-currency.pipe.ts`
 * and `dashboard/report/basic/conversionTypes.ts`): amounts are stored in
 * plain rupees and converted to crores (÷ 1,00,00,000) for display, and
 * grouped using the Indian digit-grouping convention (lakh/crore commas).
 */

export const RUPEES_PER_CRORE = 1_00_00_000;

const isNumeric = (value: unknown): value is number =>
  typeof value === "number" && !Number.isNaN(value);

/** Converts a plain-rupee amount to crores. Returns null for missing/invalid input. */
export function toCrore(value: number | null | undefined): number | null {
  if (!isNumeric(value)) return null;
  return value / RUPEES_PER_CRORE;
}

/**
 * Formats a number using Indian digit grouping (e.g. 3124458 -> "31,24,458"),
 * wrapping negative values in parentheses instead of a leading minus sign
 * (matches the sample AFS report and the app's existing InrCurrencyPipe).
 */
export function formatIndianNumber(
  value: number | null | undefined,
  decimals = 0
): string {
  if (!isNumeric(value)) return "-";
  const isNegative = value < 0;
  const absolute = Math.abs(value);
  const formatted = absolute.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return isNegative ? `(${formatted})` : formatted;
}

/** Formats a plain-rupee amount as whole crores, Indian-grouped (e.g. "5,515"). */
export function formatCrore(value: number | null | undefined): string {
  return formatIndianNumber(toCrore(value), 0);
}

/** Formats a percentage value (already expressed as e.g. 17.4, not 0.174). */
export function formatPercent(
  value: number | null | undefined,
  decimals = 0
): string {
  if (!isNumeric(value)) return "NA";
  return `${value.toFixed(decimals)}%`;
}

/**
 * CAGR between a base and a latest value, per the AFS Analysis documentation
 * (section 3.9):
 *   - base > 0 and latest missing -> -100
 *   - base > 0 and latest >= 0    -> ((latest / base) ^ (1/3) - 1) × 100, 3 annual intervals
 *   - anything else               -> null ("NA")
 *
 * Used client-side only for metrics the API's CAGR row doesn't already cover
 * (e.g. Surplus/Deficit, which isn't one of the Dataset 2 columns).
 */
export function calculateCagr(
  base: number | null | undefined,
  latest: number | null | undefined
): number | null {
  if (!isNumeric(base)) return null;
  if (base > 0 && !isNumeric(latest)) return -100;
  if (base > 0 && isNumeric(latest) && latest >= 0) {
    return +(((Math.pow(latest / base, 1 / 3) - 1) * 100).toFixed(2));
  }
  return null;
}
