import { Link } from "react-router";
import type { Evidence } from "../../js/types";

type BookmarksListProps = {
  items: Evidence[];
};

function BookmarksList({ items }: BookmarksListProps) {
  if (items.length === 0) {
    return (
      <p>No bookmarked evidence yet. Bookmark items from the Evidence view.</p>
    );
  }

  return (
    <div className="bookmarks-list">
      {items.map((ev) => (
        <div className="mini-list-item" key={ev.id}>
          <strong>{ev.id}</strong> &mdash; {ev.title}{" "}
          {/* a link to the evidence route instead of navigateTo() + setTimeout */}
          <Link
            to={"/evidence/" + ev.id}
            className="btn btn-small btn-secondary"
          >
            Open
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BookmarksList;
