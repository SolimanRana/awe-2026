import type { Evidence, Person } from "../../js/types";
import Section from "../components/Section";
import { loadNotes } from "../storage";
import BookmarksList from "./BookmarksList";
import NotesList from "./NotesList";
import HypothesisForm from "./HypothesisForm";

// Feature component for the Investigator Workspace.
type WorkspacePageProps = {
  evidence: Evidence[];
  people: Person[];
  // DEMO 5: the same bookmark list (from App) as the Dashboard and the
  // Evidence view. Before, this page read localStorage on its own.
  bookmarks: string[];
};

function WorkspacePage({ evidence, people, bookmarks }: WorkspacePageProps) {
  // DEMO 4 + DEMO 5: derived from App's bookmark state, not stored
  // BEFORE Demo 5, this page read localStorage on its own:
  //   const bookmarks = loadBookmarks();
  const bookmarkedItems = evidence.filter((ev) => bookmarks.includes(ev.id));
  // the notes are still read from localStorage here (lifted in Demo 6)
  const notes = loadNotes();

  return (
    <Section title="Investigator Workspace">
      <div className="workspace-grid">
        <div className="workspace-col">
          <h3>Bookmarked Evidence</h3>
          <BookmarksList items={bookmarkedItems} />
        </div>
        <div className="workspace-col">
          <h3>Personal Notes</h3>
          <p className="hint-text">
            Notes are attached to whichever evidence item is currently open in
            the Evidence view.
          </p>
          <NotesList evidence={evidence} notes={notes} />
        </div>
      </div>
      <HypothesisForm people={people} evidence={evidence} />
    </Section>
  );
}

export default WorkspacePage;