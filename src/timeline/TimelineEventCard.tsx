import { Link } from "react-router";
import type { Person, TimelineEvent } from "../../js/types";
import Badge from "../components/Badge";
import type { BadgeVariant } from "../components/Badge";

// DEMO 5: split out of TimelineList. Single job: how ONE event looks.
// Presentational: it gets one event as a prop and only renders it.
type TimelineEventCardProps = {
  event: TimelineEvent;
  people: Person[];
};

// DEMO 2 (technique: lookup function): maps a certainty value to the
// badge colour class that already exists in css
function certaintyBadgeClass(certainty: string): BadgeVariant {
  if (certainty === "confirmed") return "reviewed";
  if (certainty === "contradictory") return "critical";
  if (certainty === "reported") return "flagged";
  return "unreviewed";
}

function TimelineEventCard({ event, people }: TimelineEventCardProps) {
  // shows the person's name instead of the raw id (falls back to the id)
  function personName(id: string): string {
    return people.find((p) => p.id === id)?.name ?? id;
  }

  return (
    <div className={"timeline-event certainty-" + event.certainty}>
      <div className="timeline-time">
        {/* DEMO 1: a computed value inside {...} */}
        {new Date(event.time).toLocaleString()} &middot;{" "}
        {/* DEMO 2: state-dependent style, the badge colour depends on the certainty */}
        {/* DEMO 7: reusable Badge, use no. 1 */}
        <Badge
          label={event.certainty}
          variant={certaintyBadgeClass(event.certainty)}
        />
      </div>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      {/* DEMO 2 (technique: &&): only shown when the event has people.*/}
      {event.personIds.length > 0 && (
        <p className="evidence-meta">
          People:{" "}
          {event.personIds.map((id, i) => (
            <span key={id}>
              {i > 0 && ", "}
              {/* DEMO 9: every name links to the person's own route */}
              <Link to={"/team/people/" + id}>{personName(id)}</Link>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

export default TimelineEventCard;
