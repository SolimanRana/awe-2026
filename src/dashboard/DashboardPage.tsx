import { Link } from "react-router";
import type { AppData } from "../data";
import Section from "../components/Section";
import CaseSummaryCard from "./CaseSummaryCard";
import StatCard from "./StatCard";
import ReviewProgress from "./ReviewProgress";
import RecentEvidence from "./RecentEvidence";
import RecentTimeline from "./RecentTimeline";

type DashboardPageProps = {
  data: AppData;
  // DEMO 5: the bookmarks come from App's state (props), not from the
  // start-up data, so the count is always up to date.
  bookmarks: string[];
};

function DashboardPage({ data, bookmarks }: DashboardPageProps) {
  // DEMO 4: derived values, calculated from the data on every render
  const reviewedCount = data.evidence.filter(
    (ev) => ev.status.toLowerCase() === "reviewed",
  ).length;
  const progressPct =
    data.evidence.length === 0
      ? 0
      : Math.round((reviewedCount / data.evidence.length) * 100);

  // DEMO 3: slice() makes a copy, so reverse() doesn't change the original
  const recentEvidence = data.evidence.slice(-5).reverse();
  const recentTimeline = data.timeline.slice(-5).reverse();

  return (
    <Section title="Case Dashboard">
      <div className="intro-card">
        <h3>How to use this portal</h3>
        <p>
          Everything gathered on the case so far is organised into four working
          views. Use the navigation bar at the top to move between them at any
          time.
        </p>
        <div className="howto-grid">
          <div className="howto-item">
            <h4>1. Evidence Catalogue</h4>
            <p>Search, filter, and sort every evidence item.</p>
            <Link to="/evidence" className="btn btn-secondary btn-small">
              Go to Evidence
            </Link>
          </div>
          <div className="howto-item">
            <h4>2. People &amp; Locations</h4>
            <p>Profiles and statements of the team, and the key locations.</p>
            <Link to="/team/people" className="btn btn-secondary btn-small">
              Go to People &amp; Locations
            </Link>
          </div>
          <div className="howto-item">
            <h4>3. Timeline</h4>
            <p>Walk through events in chronological order.</p>
            <Link to="/timeline" className="btn btn-secondary btn-small">
              Go to Timeline
            </Link>
          </div>
          <div className="howto-item">
            <h4>4. Investigator Workspace</h4>
            <p>Your bookmarked evidence, notes and hypothesis.</p>
            <Link to="/workspace" className="btn btn-secondary btn-small">
              Go to Workspace
            </Link>
          </div>
        </div>
      </div>

      <CaseSummaryCard caseData={data.caseData} />

      <div className="stat-grid">
        <StatCard value={data.evidence.length} label="Evidence items" />
        <StatCard value={data.people.length} label="People" />
        <StatCard value={data.locations.length} label="Locations" />
        {/* DEMO 4 + DEMO 5: derived from App's bookmark state on every render.
            BEFORE Demo 5:
              <StatCard value={data.bookmarks.length} label="Bookmarked" />
            data.bookmarks was read once at start-up, so the count went
            stale as soon as a bookmark was toggled. */}
        <StatCard value={bookmarks.length} label="Bookmarked" />
        <StatCard value={reviewedCount} label="Reviewed" />
      </div>

      <ReviewProgress percent={progressPct} />

      <div className="dashboard-columns">
        <RecentEvidence items={recentEvidence} />
        <RecentTimeline events={recentTimeline} />
      </div>
    </Section>
  );
}

export default DashboardPage;
