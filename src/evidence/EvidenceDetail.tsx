import { useState } from "react";
import type { Evidence, Location, Person } from "../../js/types";
import { loadNotes, saveNotes } from "../storage";
import { formatDate } from "../utils";

type EvidenceDetailProps = {
  evidence: Evidence;
  people: Person[];
  locations: Location[];
  onClose: () => void;
};

// The detail panel of one evidence item (below the list).
function EvidenceDetail({
  evidence: ev,
  people,
  locations,
  onClose,
}: EvidenceDetailProps) {
  // the saved note (shown in the preview) and the text while typing
  const [savedNote, setSavedNote] = useState(() => loadNotes()[ev.id] ?? "");
  const [draft, setDraft] = useState(savedNote);

  function handleSaveNote() {
    saveNotes({ ...loadNotes(), [ev.id]: draft });
    setSavedNote(draft);
  }

  const personNames = ev.personIds.map(
    (id) => people.find((p) => p.id === id)?.name ?? id,
  );
  const locationNames = ev.locationIds.map((id) => {
    const loc = locations.find((l) => l.id === id);
    return loc ? loc.id + " - " + loc.name : id;
  });

  return (
    <div className="evidence-detail">
      <div className="evidence-detail-header">
        <div>
          <h2>{ev.title}</h2>
          <div className="evidence-meta">
            {ev.id} &middot; {ev.type} &middot; {formatDate(ev.timestamp)}
          </div>
        </div>
        {/* DEMO 1: onClick instead of addEventListener("click", closeEvidenceDetail) */}
        <button
          type="button"
          className="btn btn-secondary btn-small"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      {ev.tags.includes("critical") && (
        <div className="warning-banner">
          This item is tagged as critical evidence.
        </div>
      )}

      <div className="detail-field">
        <strong>Summary</strong>
        {ev.summary}
      </div>
      <div className="evidence-detail-content">{ev.content}</div>
      <div className="detail-field">
        <strong>Related people</strong>
        {personNames.join(", ")}
      </div>
      <div className="detail-field">
        <strong>Related locations</strong>
        {locationNames.join(", ")}
      </div>
      <div className="detail-field">
        <strong>Tags</strong>
        {ev.tags.map((tag) => (
          <span className="tag-chip" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      {/* status and relevance can't be changed yet, that comes in Demo 6 */}
      <div className="detail-field">
        <strong>Review status</strong>
        <select defaultValue={ev.status.toLowerCase()}>
          <option value="unreviewed">Unreviewed</option>
          <option value="reviewed">Reviewed</option>
          <option value="flagged">Flagged</option>
        </select>
      </div>

      <div className="detail-field">
        <strong>Relevance</strong>
        <select defaultValue={ev.relevance.toLowerCase()}>
          <option value="unknown">Unknown</option>
          <option value="relevant">Relevant</option>
          <option value="irrelevant">Irrelevant</option>
        </select>
      </div>

      <div className="detail-field">
        <strong>Investigator note</strong>
        <textarea
          className="note-textarea"
          rows={3}
          placeholder="Add a private note about this evidence..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        {/* DEMO 1: onClick instead of addEventListener("click", saveCurrentNote) */}
        <button
          type="button"
          className="btn btn-primary btn-small"
          style={{ marginTop: "6px" }}
          onClick={handleSaveNote}
        >
          Save note
        </button>
      </div>

      <div className="detail-field">
        <strong>Note preview</strong>
        {/* shown as text, not as HTML (the vanilla version used innerHTML) */}
        <div>{savedNote}</div>
      </div>
    </div>
  );
}

export default EvidenceDetail;
