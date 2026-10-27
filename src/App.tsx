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

function App({ data }: AppProps) {
  // DEMO 5: lifting state up.
  // Three places need the bookmarks:
  //   App                      <- the state lives HERE
  //   ├── DashboardPage        reads it  (Bookmarked count)
  //   ├── EvidencePage         reads AND changes it (star button)
  //   └── WorkspacePage        reads it  (bookmarked list)
  // App is their lowest common ancestor. Before, the useState was inside
  // EvidencePage, so the Dashboard and the Workspace could not see it.
  //
  // BEFORE Demo 5, App had no state at all, and the routes were:
  //   <DashboardPage data={data} />
  //   <EvidencePage evidence={...} people={...} locations={...} />
  //   <WorkspacePage evidence={...} people={...} />
  const [bookmarks, setBookmarks] = useState<string[]>(data.bookmarks);

  // DEMO 5: the function that changes the state lives next to the state.
  // It is passed down to the Evidence view as the prop onToggleBookmark.
  // DEMO 3: toggling creates a NEW array, the old one is not changed.
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
          {/* DEMO 5: the Dashboard only gets the value (to count it) */}
          <Route
            path="/dashboard"
            element={<DashboardPage data={data} bookmarks={bookmarks} />}
          />
          {/* DEMO 5: the Evidence view gets the value AND the function to
              change it (two routes: without and with an open detail) */}
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
                events={data.timeline}
                people={data.people}
                locations={data.locations}
              />
            }
          />
          {/* DEMO 5: the Workspace only gets the value (to list the items) */}
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;