import { Link, useParams } from "react-router";
import type { Person } from "../../js/types";
import Section from "../components/Section";

// DEMO 9: the page behind the route /team/people/:personId.
// DEMO 5: feature component - it reads the URL and picks the right person.
type PersonDetailPageProps = {
  people: Person[];
};

function PersonDetailPage({ people }: PersonDetailPageProps) {
  // DEMO 9: read the route parameter. By default TypeScript types it as
  // string | undefined, because it is just text from the URL.
  const { personId } = useParams();
  const person = people.find((p) => p.id === personId);

  // DEMO 9: the id in the URL may not match any real person, e.g.
  // #/team/people/nobody. Then we show a message instead of crashing.
  if (!person) {
    return (
      <Section title="Person not found">
        <p>
          There is no person with the id <code>{personId}</code>.
        </p>
        <p>
          <Link to="/team/people">Back to all people</Link>
        </p>
      </Section>
    );
  }

  return (
    <Section title={person.name}>
      <p>
        <Link to="/team/people">&larr; All people</Link>
        {" · "}
        {/* DEMO 10: opens the timeline with a query parameter */}
        <Link to={"/timeline?person=" + person.id}>
          Show this person on the timeline
        </Link>
      </p>
      <div className="person-card">
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
        <div className="person-statement">&ldquo;{person.statement}&rdquo;</div>
        <p>{person.background}</p>
      </div>
    </Section>
  );
}

export default PersonDetailPage;
