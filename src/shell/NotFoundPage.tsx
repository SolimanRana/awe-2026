import { Link, useLocation } from "react-router";
import Section from "../components/Section";

// DEMO 8: shown when the URL matches no route (path="*" in App.tsx).
// The vanilla app silently fell back to the dashboard instead.
function NotFoundPage() {
  const location = useLocation();
  return (
    <Section title="Page not found">
      <p>
        There is no page at <code>{location.pathname}</code>.
      </p>
      <p>
        <Link to="/dashboard">Go to the dashboard</Link>
      </p>
    </Section>
  );
}

export default NotFoundPage;
