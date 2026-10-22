import { Link } from "react-router";
import type { Person } from "../../js/types";

// DEMO 1: explicitly typed props, no "any"
type PeopleListProps = {
  people: Person[];
};

// DEMO 3: renders the people list as a mapped collection of components.
function PeopleList({ people }: PeopleListProps) {
  return (
    <div className="people-grid">
      {people.map((person) => (
        // DEMO 3: map() turns every person into one card
        <div className="person-card" key={person.id}>
          <div className="person-card-header">
            <img
              className="person-avatar"
              src={person.avatar}
              alt={"Portrait of " + person.name}
            />
            <div>
              <h3>
                {/* DEMO 9: link to the parameterized route of this person */}
                <Link to={"/team/people/" + person.id}>{person.name}</Link>
              </h3>
              <div className="person-role">{person.role}</div>
            </div>
          </div>
          <p>
            <strong>Speciality:</strong> {person.speciality}
          </p>
          <ul>
            {person.responsibilities.map((responsibility) => (
              // DEMO 3: a list inside the list. Responsibilities have no id,
              <li key={responsibility}> {responsibility}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default PeopleList;
