import type {
  CaseData,
  Evidence,
  Person,
  Location,
  TimelineEvent,
} from "../js/types";

export type AppData = {
  caseData: CaseData;
  evidence: Evidence[];
  people: Person[];
  locations: Location[];
  timeline: TimelineEvent[];
  bookmarks: string[];
};

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(path);
  return (await response.json()) as T;
}

// The bookmarks are stored by the vanilla app under this key. They are read
// once at start-up, so the React dashboard shows the same count.
function loadBookmarks(): string[] {
  try {
    const raw = localStorage.getItem("remotion_bookmarks");
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export async function loadData(): Promise<AppData> {
  const [caseData, evidence, people, locations, timeline] = await Promise.all([
    fetchJson<CaseData>("data/case.json"),
    fetchJson<Evidence[]>("data/evidence.json"),
    fetchJson<Person[]>("data/people.json"),
    fetchJson<Location[]>("data/locations.json"),
    fetchJson<TimelineEvent[]>("data/timeline.json"),
  ]);
  return {
    caseData,
    evidence,
    people,
    locations,
    timeline,
    bookmarks: loadBookmarks(),
  };
}
