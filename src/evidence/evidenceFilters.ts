import type { Evidence, Person } from "../../js/types";

// DEMO 4: the filter/search/sort values of the Evidence Catalogue and the
// function that calculates the visible list from them.

export type SortOrder = "date-desc" | "date-asc" | "title-asc" | "title-desc";

export type EvidenceFilters = {
  search: string;
  type: string;
  person: string;
  location: string;
  status: string;
  relevance: string;
  sort: SortOrder;
};

// the filter fields (everything except the sort order)
export type FilterField = Exclude<keyof EvidenceFilters, "sort">;

export const initialFilters: EvidenceFilters = {
  search: "",
  type: "",
  person: "",
  location: "",
  status: "",
  relevance: "",
  sort: "date-desc",
};

// same rule as evidenceMentionsPerson() in js/utils.ts: some evidence items
// store the person's name ("Nova Byte") instead of the id ("nova-byte")
function mentionsPerson(ev: Evidence, person: Person): boolean {
  return ev.personIds.includes(person.id) || ev.personIds.includes(person.name);
}

function time(ev: Evidence): number {
  return new Date(ev.timestamp).getTime();
}

// DEMO 4: the visible list is CALCULATED from the full evidence list and the
// filter state, on every render. It is never stored in its own state.
export function filterAndSortEvidence(
  evidence: Evidence[],
  filters: EvidenceFilters,
  people: Person[],
): Evidence[] {
  const search = filters.search.toLowerCase().trim();
  const person = people.find((p) => p.id === filters.person);

  // filter() always returns a NEW array ...
  const result = evidence.filter((ev) => {
    const text = (
      ev.title +
      " " +
      ev.summary +
      " " +
      ev.tags.join(" ")
    ).toLowerCase();
    if (search && !text.includes(search)) return false;
    if (filters.type && ev.type.toLowerCase() !== filters.type) return false;
    if (person && !mentionsPerson(ev, person)) return false;
    if (filters.location && !ev.locationIds.includes(filters.location))
      return false;
    if (filters.status && ev.status.toLowerCase() !== filters.status)
      return false;
    if (filters.relevance && ev.relevance.toLowerCase() !== filters.relevance)
      return false;
    return true;
  });

  // ... so sort() only changes this new array, never the evidence state.
  // DEMO 3: the vanilla app sorted the master array itself and lost the
  // original order. That can't happen here.
  if (filters.sort === "title-asc") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (filters.sort === "title-desc") {
    result.sort((a, b) => b.title.localeCompare(a.title));
  } else if (filters.sort === "date-asc") {
    result.sort((a, b) => time(a) - time(b));
  } else {
    result.sort((a, b) => time(b) - time(a));
  }
  return result;
}
