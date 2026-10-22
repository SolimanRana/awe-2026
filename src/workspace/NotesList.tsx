import type { Evidence } from "../../js/types";
import type { Notes } from "../storage";

type NotesListProps = {
  evidence: Evidence[];
  notes: Notes;
};

function NotesList({ evidence, notes }: NotesListProps) {
  // only the evidence items that have a note
  const itemsWithNote = evidence.filter((ev) => notes[ev.id]);

  if (itemsWithNote.length === 0) {
    return <p>No notes yet. Add one from an evidence item's detail view.</p>;
  }

  return (
    <div className="notes-list">
      {itemsWithNote.map((ev) => (
        // key = evidence id. The vanilla version used the array index
        // (id="noteText-3"), see Exercise 4, Demo 4.
        <div className="mini-list-item" key={ev.id}>
          <strong>{ev.id}</strong> &mdash; {ev.title}
          <div>{notes[ev.id]}</div>
        </div>
      ))}
    </div>
  );
}

export default NotesList;
