import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Evidence, Location, Person } from "../../js/types";
import Section from "../components/Section";
import { loadBookmarks, saveBookmarks } from "../storage";
import { filterAndSortEvidence } from "./evidenceFilters";
import type {
  EvidenceFilters,
  FilterField,
  SortOrder,
} from "./evidenceFilters";
import EvidenceToolbar from "./EvidenceToolbar";
import EvidenceList from "./EvidenceList";
import EvidenceDetail from "./EvidenceDetail";

// Feature component for the Evidence Catalogue.
type EvidencePageProps = {
  evidence: Evidence[];
  people: Person[];
  locations: Location[];
};

function EvidencePage({ evidence, people, locations }: EvidencePageProps) {
  // the bookmarks live here for now, because the star button is here
  const [bookmarks, setBookmarks] = useState<string[]>(loadBookmarks);
  // DEMO 2: the search box and all filters are controlled inputs.
  // For now: one useState per value (seven in total).
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [person, setPerson] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [relevance, setRelevance] = useState("");
  const [sort, setSort] = useState<SortOrder>("date-desc");
  const filters: EvidenceFilters = {
    search,
    type,
    person,
    location,
    status,
    relevance,
    sort,
  };

  // the toolbar tells us which field changed, we call the right setter
  function changeFilter(field: FilterField, value: string) {
    if (field === "search") setSearch(value);
    else if (field === "type") setType(value);
    else if (field === "person") setPerson(value);
    else if (field === "location") setLocation(value);
    else if (field === "status") setStatus(value);
    else setRelevance(value);
  }

  // all six filters back to empty, the sort order stays
  function clearFilters() {
    setSearch("");
    setType("");
    setPerson("");
    setLocation("");
    setStatus("");
    setRelevance("");
  }

  // DEMO 3: toggling creates a NEW array, the old one is not changed.
  // The vanilla app did bookmarks.push(id) and ev.bookmarked = true
  // (mutation). filter() and [...bookmarks, id] both return a new array.
  function toggleBookmark(evidenceId: string) {
    const next = bookmarks.includes(evidenceId)
      ? bookmarks.filter((id) => id !== evidenceId)
      : [...bookmarks, evidenceId];
    setBookmarks(next);
    saveBookmarks(next);
  }

  // DEMO 4: derived during render, not stored in state
  const visibleEvidence = filterAndSortEvidence(evidence, filters, people);

  // the open detail comes from the URL (#/evidence/E04), like in Exercise 4
  const { evidenceId } = useParams();
  const selected = evidence.find((ev) => ev.id === evidenceId);
  const navigate = useNavigate();

  return (
    <Section title="Evidence Catalogue">
      <EvidenceToolbar
        filters={filters}
        onFilterChange={changeFilter}
        onSortChange={setSort}
        onClearFilters={clearFilters}
        evidence={evidence}
        people={people}
        locations={locations}
      />
      <EvidenceList
        items={visibleEvidence}
        bookmarks={bookmarks}
        onToggleBookmark={toggleBookmark}
        onOpen={(id) => navigate("/evidence/" + id)}
      />
      {selected && (
        <EvidenceDetail
          // key: when another item is opened, the detail starts fresh
          key={selected.id}
          evidence={selected}
          people={people}
          locations={locations}
          onClose={() => navigate("/evidence")}
        />
      )}
    </Section>
  );
}

export default EvidencePage;
