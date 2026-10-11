import Section from "./Section";

// A stub page for views that are not migrated to React yet.
type PlaceholderPageProps = {
  title: string;
  note: string;
};

function PlaceholderPage({ title, note }: PlaceholderPageProps) {
  return (
    <Section title={title}>
      <p>{note}</p>
    </Section>
  );
}

export default PlaceholderPage;
