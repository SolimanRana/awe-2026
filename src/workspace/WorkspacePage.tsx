import type { Evidence, Person } from "../../js/types";
import Section from "../components/Section";
import { loadBookmarks, loadNotes } from "../storage";
import BookmarksList from "./BookmarksList";
import NotesList from "./NotesList";
import HypothesisForm from "./HypothesisForm";

// Feature component for the Investigator Workspace.
type WorkspacePageProps = {
  evidence: Evidence[];
  people: Person[];
};

function WorkspacePage({ evidence, people }: WorkspacePageProps) {
  // for now read straight from localStorage, every time the page renders
  // (the bookmark state lives in the Evidence view, not here)
  const bookmarks = loadBookmarks();
  const bookmarkedItems = evidence.filter((ev) => bookmarks.includes(ev.id));
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
