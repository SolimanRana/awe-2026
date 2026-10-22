import type { Evidence, Location, Person } from "../../js/types";
import type {
  EvidenceFilters,
  FilterField,
  SortOrder,
} from "./evidenceFilters";

type EvidenceToolbarProps = {
  filters: EvidenceFilters;
  onFilterChange: (field: FilterField, value: string) => void;
  onSortChange: (sort: SortOrder) => void;
  onClearFilters: () => void;
  evidence: Evidence[];
  people: Person[];
  locations: Location[];
};

// The search box and all filter dropdowns.
// DEMO 2: every input is CONTROLLED: its value comes from state (value=...)
// and every change goes back into state (onChange=...).
// DEMO 1: the vanilla version attached these with addEventListener in
// js/main.ts and onchange="handleSortChange()" in index.html.
function EvidenceToolbar({
  filters,
  onFilterChange,
  onSortChange,
  onClearFilters,
  evidence,
  people,
  locations,
}: EvidenceToolbarProps) {
  // all evidence types, lower case, without duplicates
  const types = [...new Set(evidence.map((ev) => ev.type.toLowerCase()))];

  return (
    <div className="toolbar">
      <div className="toolbar-row">
        <label htmlFor="evidenceSearch" className="visually-hidden">
          Search evidence
        </label>
        {/* DEMO 1 + DEMO 2: onChange instead of addEventListener("input") */}
        <input
          type="text"
          id="evidenceSearch"
          placeholder="Search evidence by title, summary, or tag…"
          autoComplete="off"
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
        />

        <label htmlFor="filterType" className="visually-hidden">
          Filter by type
        </label>
        <select
          id="filterType"
          value={filters.type}
          onChange={(e) => onFilterChange("type", e.target.value)}
        >
          <option value="">All types</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <label htmlFor="filterPerson" className="visually-hidden">
          Filter by person
        </label>
        <select
          id="filterPerson"
          value={filters.person}
          onChange={(e) => onFilterChange("person", e.target.value)}
        >
          <option value="">All people</option>
          {people.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <label htmlFor="filterLocation" className="visually-hidden">
          Filter by location
        </label>
        <select
          id="filterLocation"
          value={filters.location}
          onChange={(e) => onFilterChange("location", e.target.value)}
        >
          <option value="">All locations</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.id} - {loc.name}
            </option>
          ))}
        </select>
      </div>

      <div className="toolbar-row">
        <label htmlFor="filterStatus" className="visually-hidden">
          Filter by status
        </label>
        <select
          id="filterStatus"
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
        >
          <option value="">All statuses</option>
          <option value="unreviewed">Unreviewed</option>
          <option value="reviewed">Reviewed</option>
          <option value="flagged">Flagged</option>
        </select>

        <label htmlFor="filterRelevance" className="visually-hidden">
          Filter by relevance
        </label>
        <select
          id="filterRelevance"
          value={filters.relevance}
          onChange={(e) => onFilterChange("relevance", e.target.value)}
        >
          <option value="">All relevance</option>
          <option value="unknown">Unknown</option>
          <option value="relevant">Relevant</option>
          <option value="irrelevant">Irrelevant</option>
        </select>

        <label htmlFor="sortEvidence" className="visually-hidden">
          Sort evidence
        </label>
        <select
          id="sortEvidence"
          value={filters.sort}
          onChange={(e) => onSortChange(e.target.value as SortOrder)}
        >
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="title-asc">Title (A–Z)</option>
          <option value="title-desc">Title (Z–A)</option>
        </select>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClearFilters}
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}

export default EvidenceToolbar;
