import type { Person, TimelineEvent } from "../../js/types";
import TimelineEventCard from "./TimelineEventCard";

// DEMO 1: explicitly typed props, no "any"
type TimelineListProps = {
  events: TimelineEvent[];
  people: Person[];
};

// DEMO 3: the third collection, the timeline events.
// DEMO 5: before the split, this component did two jobs: the list AND the
// markup of every single event. Now it only does the list part: empty state
// and one TimelineEventCard per event. How a card looks is not its job.
function TimelineList({ events, people }: TimelineListProps) {
  // DEMO 2 (technique: early return): an empty list gets its own message
  // instead of an empty container. To show it, pass [] in TimeLinePage
  if (events.length === 0) {
    return <p>No timeline events match.</p>;
  }

  return (
    <div className="timeline-container">
      {events.map((event) => (
        // DEMO 3: key = the event's id from the data (e.g. "T01").
        // The key goes on the element that map returns, here the card component.
        <TimelineEventCard event={event} people={people} key={event.id} />
      ))}
    </div>
  );
}

export default TimelineList;
