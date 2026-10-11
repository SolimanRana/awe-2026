import { Link } from "react-router";
import type { TimelineEvent } from "../../js/types";

type RecentTimelineProps = {
  events: TimelineEvent[];
};

function RecentTimeline({ events }: RecentTimelineProps) {
  return (
    <div className="dashboard-panel">
      <h3>Recent timeline events</h3>
      {events.length === 0 && <p>No timeline events loaded yet.</p>}
      {events.map((event) => (
        <div className="mini-list-item" key={event.id}>
          <strong>{new Date(event.time).toLocaleString()}</strong>
          <br />
          {event.title}
        </div>
      ))}
      <p>
        <Link to="/timeline">Open the full timeline</Link>
      </p>
    </div>
  );
}

export default RecentTimeline;
