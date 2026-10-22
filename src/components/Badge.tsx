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
