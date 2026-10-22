import { NavLink } from "react-router";
import type { Person, Location } from "../../js/types";
import Section from "../components/Section";
import PeopleList from "./PeopleList";
import LocationsList from "./LocationsList";

// DEMO 8: the People & Locations view. Which tab is shown is no longer
// local state (vanilla: switchPeopleTab() + classList), it comes from the
// URL: /team/people or /team/locations. Both are real, bookmarkable routes.
// DEMO 5: feature component - it gets the data and decides what to show.
// DEMO 1: explicitly typed props, no "any"
type TeamPageProps = {
  people: Person[];
  locations: Location[];
  tab: "people" | "locations";
};

function TeamPage({ people, locations, tab }: TeamPageProps) {
  return (
    <Section title="People & Locations">
      <div className="tab-bar">
        {/* DEMO 8: the tabs are links to the two routes */}
        <NavLink
          to="/team/people"
          className={({ isActive }) => "tab-btn" + (isActive ? " active" : "")}
        >
          People
        </NavLink>
        <NavLink
          to="/team/locations"
          className={({ isActive }) => "tab-btn" + (isActive ? " active" : "")}
        >
          Locations
        </NavLink>
      </div>
      {/* DEMO 1 type error: change people={people} to people={locations}
          and TypeScript complains, because a Location is not a Person */}
      {tab === "people" ? (
        <PeopleList people={people} />
      ) : (
        <LocationsList locations={locations} />
      )}
    </Section>
  );
}

export default TeamPage;
