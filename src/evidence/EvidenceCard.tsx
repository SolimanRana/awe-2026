import type { Evidence } from "../../js/types";
import Badge from "../components/Badge";
import {
  formatDate,
  relevanceBadgeVariant,
  statusBadgeVariant,
} from "../utils";

type EvidenceCardProps = {
  evidence: Evidence;
  isBookmarked: boolean;
  onToggleBookmark: (evidenceId: string) => void;
  onOpen: (evidenceId: string) => void;
};

// One evidence card. Presentational: it only shows its props and calls
// the callbacks it gets. It does not change any state itself.
function EvidenceCard({
  evidence: ev,
  isBookmarked,
  onToggleBookmark,
  onOpen,
}: EvidenceCardProps) {
  return (
    // DEMO 1: onClick on the card itself. The vanilla version used ONE
    // listener on the whole list and checked event.target (delegation).
    <div className="evidence-card" onClick={() => onOpen(ev.id)}>
      <button
        type="button"
        className={"bookmark-btn" + (isBookmarked ? " active" : "")}
        aria-label={"Toggle bookmark for " + ev.title}
        onClick={(e) => {
          // the click should not also open the detail of the card
          e.stopPropagation();
          // DEMO 5 + DEMO 6: the card only CALLS the callback.
          // The state is changed by the component that owns it (App).
          onToggleBookmark(ev.id);
        }}
      >
        <span className="bookmark-icon">{isBookmarked ? "★" : "☆"}</span>
      </button>
      <h3>{ev.title}</h3>
      <div className="evidence-meta">
        {ev.id} &middot; {ev.type} &middot; {formatDate(ev.timestamp)}
      </div>
      <div className="evidence-summary">{ev.summary}</div>
      {ev.tags.includes("critical") && (
        <Badge label="Critical" variant="critical" />
      )}{" "}
      <Badge label={ev.status} variant={statusBadgeVariant(ev.status)} />{" "}
      <Badge
        label={ev.relevance}
        variant={relevanceBadgeVariant(ev.relevance)}
      />
      <div>
        {ev.tags.map((tag) => (
          <span className="tag-chip" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default EvidenceCard;
