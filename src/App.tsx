import { HashRouter, Navigate, Route, Routes } from "react-router";
import type { AppData } from "./data";
import Header from "./shell/Header";
import NotFoundPage from "./shell/NotFoundPage";
import PlaceholderPage from "./components/PlaceholderPage";
import DashboardPage from "./dashboard/DashboardPage";
import TeamPage from "./people-locations/TeamPage";
import PersonDetailPage from "./people-locations/PersonDetailPage";
import TimelinePage from "./timeline/TimelinePage";

type AppProps = {
  data: AppData;
};

// DEMO 8: App is the shell: header + navigation + one route per view.
// HashRouter keeps the route after the # (react.html#/team/people), so it
// works on GitHub Pages without any server configuration, like the vanilla
// app's hash routing - but the router does the matching, not handleHashChange.
function App({ data }: AppProps) {
  return (
    <HashRouter>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage data={data} />} />
          <Route
            path="/evidence"
            element={
              <PlaceholderPage
                title="Evidence"
                note="Not migrated yet (Exercise 5)."
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
                events={data.timeline}
                people={data.people}
                locations={data.locations}
              />
            }
          />
          <Route
            path="/workspace"
            element={
              <PlaceholderPage
                title="Workspace"
                note="Not migrated yet (Exercise 5)."
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
