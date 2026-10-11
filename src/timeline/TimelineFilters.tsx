import type { Location, Person } from "../../js/types";

// DEMO 10: the timeline's filter controls. Visually complete, but on purpose
// NOT wired up yet: there is no onChange and no state (that's Exercise 5).
// The only thing they do: the person filter shows the value that came in
// through the URL (?person=...), via defaultValue.
type TimelineFiltersProps = {
  people: Person[];
  locations: Location[];
  types: string[];
  selectedPersonId: string;
};

function TimelineFilters({
  people,
  locations,
  types,
  selectedPersonId,
}: TimelineFiltersProps) {
  return (
    <div className="toolbar">
      <div className="toolbar-row">
        <label htmlFor="timelineOrder" className="visually-hidden">
          Order
        </label>
        <select id="timelineOrder" defaultValue="asc">
          <option value="asc">Oldest first</option>
          <option value="desc">Newest first</option>
        </select>

        <label htmlFor="timelinePersonFilter" className="visually-hidden">
          Filter by person
        </label>
        {/* DEMO 10: pre-selected from the query parameter */}
        <select id="timelinePersonFilter" defaultValue={selectedPersonId}>
          <option value="">All people</option>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>

        <label htmlFor="timelineLocationFilter" className="visually-hidden">
          Filter by location
        </label>
        <select id="timelineLocationFilter" defaultValue="">
          <option value="">All locations</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>

        <label htmlFor="timelineTypeFilter" className="visually-hidden">
          Filter by event type
        </label>
        <select id="timelineTypeFilter" defaultValue="">
          <option value="">All event types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TimelineFilters;
