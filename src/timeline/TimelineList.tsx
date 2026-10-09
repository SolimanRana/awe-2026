import type { TimelineEvent } from "../../js/types";

type TimelineListProps = {
  events: TimelineEvent[];
};

// DEMO 3: the third collection, the timeline events.
// Old version: renderTimeline() in js/views/timeline.ts (string + innerHTML).
function TimelineList({ events }: TimelineListProps) {
  return (
    <div className="timeline-container">
      {events.map((event) => (
        // DEMO 3: key = the event's id from the data (e.g. "T01").
        <div
          className={"timeline-event certainty-" + event.certainty}
          key={event.id}
        >
          <div className="timeline-time">
            {new Date(event.time).toLocaleString()} &middot; {event.certainty}
          </div>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
}

export default TimelineList;
