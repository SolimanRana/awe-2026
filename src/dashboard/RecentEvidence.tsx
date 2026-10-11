import type { Evidence } from "../../js/types";
import Badge from "../components/Badge";
import type { BadgeVariant } from "../components/Badge";

type RecentEvidenceProps = {
  items: Evidence[];
};

// same mapping as getStatusBadgeClass() in js/utils.ts
function statusBadgeVariant(status: string): BadgeVariant {
  const s = status.toLowerCase();
  if (s === "reviewed") return "reviewed";
  if (s === "flagged") return "flagged";
  return "unreviewed";
}

function RecentEvidence({ items }: RecentEvidenceProps) {
  return (
    <div className="dashboard-panel">
      <h3>Recent evidence</h3>
      {items.length === 0 && <p>No evidence loaded yet.</p>}
      {items.map((ev) => (
        <div className="mini-list-item" key={ev.id}>
          <strong>{ev.id}</strong> &mdash; {ev.title}{" "}
          {/* reusable Badge, use no. 4 */}
          <Badge label={ev.status} variant={statusBadgeVariant(ev.status)} />
        </div>
      ))}
    </div>
  );
}

export default RecentEvidence;
