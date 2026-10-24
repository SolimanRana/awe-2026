import type {
  CaseData,
  Evidence,
  Person,
  Location,
  TimelineEvent,
} from "../js/types";
import { loadBookmarks } from "./storage";

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
    // the saved bookmarks are read once at start-up (src/storage.ts)
    bookmarks: loadBookmarks(),
  };
}
