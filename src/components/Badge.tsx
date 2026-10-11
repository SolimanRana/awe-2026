// DEMO 7: a reusable presentational component, used in two different
// places: the certainty badge in TimelineList and the id badge in
// LocationsList.
// What varies (props): the text (label) and the colour (variant).
// What stays fixed (inside): the <span>, the base class "badge" and
// therefore the shape and size from styles.css.

// DEMO 7: the variants are exactly the badge colours that exist in
// styles.css, so TypeScript rejects a colour that doesn't exist.
export type BadgeVariant =
  "reviewed" | "critical" | "flagged" | "unreviewed" | "relevant";

type BadgeProps = {
  label: string;
  variant: BadgeVariant;
};

function Badge({ label, variant }: BadgeProps) {
  return <span className={"badge badge-" + variant}>{label}</span>;
}

export default Badge;
