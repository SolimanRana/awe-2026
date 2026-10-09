import type { Person } from "../../js/types";

type PeopleListProps = {
  people: Person[];
};

// DEMO 3: renders the people list as a mapped collection of components.
// Old version: renderPeople() in js/views/people.ts built one big HTML
// string in a for-loop and wrote it into the page with innerHTML.
function PeopleList({ people }: PeopleListProps) {
  return (
    <div className="people-grid">
      {people.map((person) => (
        // DEMO 3: map() turns every person into one card.
        // key = the person's real id (e.g. "signal-scholar"), so React can
        // match this card with the same person after the next render.
        <div className="person-card" key={person.id}>
          <div className="person-card-header">
            <img
              className="person-avatar"
              src={person.avatar}
              alt={"Portrait of " + person.name}
            />
            <div>
              <h3>{person.name}</h3>
              <div className="person-role">{person.role}</div>
            </div>
          </div>
          <p>
            <strong>Speciality:</strong> {person.speciality}
          </p>
          <ul>
            {person.responsibilities.map((responsibility) => (
              // DEMO 3: a list inside the list. Responsibilities have no id,
              // but the text is unique within one person, so it works as key.
              // Keys only need to be unique among siblings, not in the whole app.
              <li key={responsibility}>{responsibility}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default PeopleList;
