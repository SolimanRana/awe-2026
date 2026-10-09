import type { Person, Location, TimelineEvent } from "../js/types";

export type AppData = {
  people: Person[];
  locations: Location[];
  timeline: TimelineEvent[];
};

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(path);
  return (await response.json()) as T;
}

export async function loadData(): Promise<AppData> {
  const [people, locations, timeline] = await Promise.all([
    fetchJson<Person[]>("data/people.json"),
    fetchJson<Location[]>("data/locations.json"),
    fetchJson<TimelineEvent[]>("data/timeline.json"),
  ]);
  return { people, locations, timeline };
}
