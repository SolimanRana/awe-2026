import type { AppData } from "./data";
import PeopleList from "./people-locations/PeopleList";
import LocationsList from "./people-locations/LocationsList";
import TimelineList from "./timeline/TimelineList";

type AppProps = {
  data: AppData;
};

// App gets all data from main.tsx and hands each list only the part it needs.
function App({ data }: AppProps) {
  return (
    <main>
      <h1>Project ReMotion</h1>
      <p>React version (migration in progress)</p>

      {/* DEMO 3: the three collections (people, locations, timeline) */}
      <h2>People</h2>
      <PeopleList people={data.people} />

      <h2>Locations</h2>
      <LocationsList locations={data.locations} />

      <h2>Timeline</h2>
      <TimelineList events={data.timeline} />
    </main>
  );
}

export default App;
