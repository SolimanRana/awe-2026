import type { ReactNode } from "react";

// DEMO 1: a component that takes children (composition).
// It doesn't know or care what's inside: it only puts a heading on top
// and wraps the content in a <section>. The content is passed in by the
// parent as children, not as a data prop.
type SectionProps = {
  title: string;
  children: ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default Section;
