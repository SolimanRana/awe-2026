// Reading and writing localStorage for the React version.
// The keys are the same as in the vanilla app (js/state.ts), so both
// versions see the same bookmarks, notes and hypothesis draft.
// There is no useEffect in this exercise: we read once at start-up and
// write directly inside the event handlers that change the data.

const KEY_BOOKMARKS = "remotion_bookmarks";
const KEY_NOTES = "remotion_notes";
const KEY_HYPOTHESIS = "remotion_hypothesis";

export type Notes = Record<string, string>;

export type HypothesisDraft = {
  suspectId: string;
  nature: string;
  evidenceIds: string[];
  confidence: string;
  explanation: string;
  alternative: string;
};

export const emptyHypothesis: HypothesisDraft = {
  suspectId: "",
  nature: "",
  evidenceIds: [],
  confidence: "50",
  explanation: "",
  alternative: "",
};

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function loadBookmarks(): string[] {
  const value = readJson<unknown>(KEY_BOOKMARKS, []);
  return Array.isArray(value) ? (value as string[]) : [];
}

export function saveBookmarks(bookmarks: string[]): void {
  localStorage.setItem(KEY_BOOKMARKS, JSON.stringify(bookmarks));
}

export function loadNotes(): Notes {
  return readJson<Notes>(KEY_NOTES, {});
}

export function saveNotes(notes: Notes): void {
  localStorage.setItem(KEY_NOTES, JSON.stringify(notes));
}

export function loadHypothesis(): HypothesisDraft {
  // merge with the empty draft, so missing fields get a default value
  return { ...emptyHypothesis, ...readJson(KEY_HYPOTHESIS, {}) };
}

export function saveHypothesis(draft: HypothesisDraft): void {
  localStorage.setItem(
    KEY_HYPOTHESIS,
    JSON.stringify({ ...draft, savedAt: new Date().toISOString() }),
  );
}
