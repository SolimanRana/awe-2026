import { useSearchParams } from "react-router";
import type { Location, Person, TimelineEvent } from "../../js/types";
import Section from "../components/Section";
import TimelineFilters from "./TimelineFilters";
import TimelineList from "./TimelineList";

// DEMO 5: feature component for the Timeline view.
type TimelinePageProps = {
  events: TimelineEvent[];
  people: Person[];
  locations: Location[];
};

function TimelinePage({ events, people, locations }: TimelinePageProps) {
  // DEMO 10: read the query parameter, e.g. #/timeline?person=nova-byte.
  // It is only READ here to decide what to show - nothing is stored in
  // state and nothing reacts to the dropdowns yet.
  const [searchParams] = useSearchParams();
  const personId = searchParams.get("person") ?? "";

  // DEMO 10: the initial list is computed from the URL on every render.
  const visibleEvents = personId
    ? events.filter((event) => event.personIds.includes(personId))
    : events;

  // all event types that occur in the data, for the type dropdown
  const types = [...new Set(events.map((event) => event.type))].sort();

  return (
    <Section title="Timeline">
      {/* key: if the URL changes to another person while this page is open,
          the dropdowns are rebuilt so they show the new pre-selection */}
      <TimelineFilters
        key={personId}
        people={people}
        locations={locations}
        types={types}
        selectedPersonId={personId}
      />
      {/* DEMO 2: to show the empty state, change events={visibleEvents} to events={[]} */}
      <TimelineList events={visibleEvents} people={people} />
    </Section>
  );
}

export default TimelinePage;
