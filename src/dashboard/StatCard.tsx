// One number with a label. Used five times on the dashboard.
// Old version: statCardHTML() in js/views/dashboard.ts (returned a string).
type StatCardProps = {
  value: number;
  label: string;
};

function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default StatCard;
