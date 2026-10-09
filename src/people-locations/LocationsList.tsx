import type { Location } from "../../js/types";

type LocationsListProps = {
  locations: Location[];
};

// DEMO 3: same pattern as PeopleList, for the locations.
// Old version: renderLocations() in js/views/people.ts (string + innerHTML).
function LocationsList({ locations }: LocationsListProps) {
  return (
    <div className="locations-grid">
      {locations.map((location) => (
        // DEMO 3: key = the location's id from the data (e.g. "L01").
        <div className="location-card" key={location.id}>
          <h3>
            {location.id} &mdash; {location.name}
          </h3>
          <p>{location.description}</p>
          <p>
            <strong>Contains:</strong>
          </p>
          <ul>
            {location.contains.map((item) => (
              // DEMO 3: nested list, the item text is unique per location.
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default LocationsList;
