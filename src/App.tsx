import { useState } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router";
import type { AppData } from "./data";
import { saveBookmarks } from "./storage";
import Header from "./shell/Header";
import NotFoundPage from "./shell/NotFoundPage";
import DashboardPage from "./dashboard/DashboardPage";
import EvidencePage from "./evidence/EvidencePage";
import TeamPage from "./people-locations/TeamPage";
import PersonDetailPage from "./people-locations/PersonDetailPage";
import TimelinePage from "./timeline/TimelinePage";
import WorkspacePage from "./workspace/WorkspacePage";

type AppProps = {
  data: AppData;
};

// DEMO 8: App is the shell: header + navigation + one route per view.
// HashRouter keeps the route after the # (react.html#/team/people), so it
// works on GitHub Pages without any server configuration, like the vanilla
// app's hash routing - but the router does the matching, not handleHashChange.
function App({ data }: AppProps) {
  // DEMO 5: the bookmark state lives HERE, in App. App is the lowest common
  // ancestor of the Dashboard (count), the Evidence view (star button) and
  // the Workspace (bookmarked list). Before, it lived in EvidencePage.
  const [bookmarks, setBookmarks] = useState<string[]>(data.bookmarks);

  // DEMO 3: toggling creates a NEW array, the old one is not changed.
  // DEMO 5: the function lives next to the state and is passed down.
  function toggleBookmark(evidenceId: string) {
    const next = bookmarks.includes(evidenceId)
      ? bookmarks.filter((id) => id !== evidenceId)
      : [...bookmarks, evidenceId];
    setBookmarks(next);
    saveBookmarks(next);
  }

  return (
    <HashRouter>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={<DashboardPage data={data} bookmarks={bookmarks} />}
          />
          {/* Exercise 5: the Evidence Catalogue, without and with an open detail */}
          <Route
            path="/evidence"
            element={
              <EvidencePage
                evidence={data.evidence}
                people={data.people}
                locations={data.locations}
                bookmarks={bookmarks}
                onToggleBookmark={toggleBookmark}
              />
            }
          />
          <Route
            path="/evidence/:evidenceId"
            element={
              <EvidencePage
                evidence={data.evidence}
                people={data.people}
                locations={data.locations}
                bookmarks={bookmarks}
                onToggleBookmark={toggleBookmark}
              />
            }
          />
          {/* DEMO 8: People and Locations are two real routes */}
          <Route
            path="/team"
            element={<Navigate to="/team/people" replace />}
          />
          <Route
            path="/team/people"
            element={
              <TeamPage
                people={data.people}
                locations={data.locations}
                tab="people"
              />
            }
          />
          {/* DEMO 9: a route with a parameter, e.g. /team/people/nova-byte */}
          <Route
            path="/team/people/:personId"
            element={<PersonDetailPage people={data.people} />}
          />
          <Route
            path="/team/locations"
            element={
              <TeamPage
                people={data.people}
                locations={data.locations}
                tab="locations"
              />
            }
          />
          <Route
            path="/timeline"
            element={
              <TimelinePage
                // DEMO 2: pass []
                events={data.timeline}
                people={data.people}
                locations={data.locations}
              />
            }
          />
          {/* Exercise 5: the Investigator Workspace */}
          <Route
            path="/workspace"
            element={
              <WorkspacePage
                evidence={data.evidence}
                people={data.people}
                bookmarks={bookmarks}
              />
            }
          />
          {/* DEMO 8: any URL that matches no route above */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;
