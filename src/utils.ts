import type { BadgeVariant } from "./components/Badge";

// Small helper functions that several views need.

// same output as formatDate() in js/utils.ts
export function formatDate(ts: string): string {
  const d = new Date(ts);
  if (isNaN(d.getTime())) return ts;
  return (
    d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) +
    " " +
    d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
  );
}

// same mapping as getStatusBadgeClass() in js/utils.ts
export function statusBadgeVariant(status: string): BadgeVariant {
  const s = status.toLowerCase();
  if (s === "reviewed") return "reviewed";
  if (s === "flagged") return "flagged";
  return "unreviewed";
}

// same mapping as getRelevanceBadgeClass() in js/utils.ts
export function relevanceBadgeVariant(relevance: string): BadgeVariant {
  return relevance.toLowerCase() === "relevant" ? "relevant" : "unreviewed";
}
