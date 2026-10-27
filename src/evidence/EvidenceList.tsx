import type { Evidence } from "../../js/types";
import EvidenceCard from "./EvidenceCard";

type EvidenceListProps = {
  items: Evidence[];
  bookmarks: string[];
  onToggleBookmark: (evidenceId: string) => void;
  onOpen: (evidenceId: string) => void;
};

// The grid of evidence cards.
function EvidenceList({
  items,
  bookmarks,
  onToggleBookmark,
  onOpen,
}: EvidenceListProps) {
  if (items.length === 0) {
    return <p>No evidence matches the current filters.</p>;
  }

  return (
    <div className="evidence-grid">
      {items.map((ev) => (
        <EvidenceCard
          key={ev.id}
          evidence={ev}
          // DEMO 4: "is it bookmarked?" is derived from the bookmark list.
          // There is no bookmarked flag stored on the item.
          isBookmarked={bookmarks.includes(ev.id)}
          // DEMO 5 + DEMO 6: the callback is only passed on,
          // one more layer down
          onToggleBookmark={onToggleBookmark}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}

export default EvidenceList;
