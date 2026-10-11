import type { CaseData } from "../../js/types";
import Badge from "../components/Badge";

type CaseSummaryCardProps = {
  caseData: CaseData;
};

function CaseSummaryCard({ caseData }: CaseSummaryCardProps) {
  return (
    <div className="case-summary-card">
      <h3>{caseData.title}</h3>
      <p>
        {/* reusable Badge, use no. 3 */}
        <Badge label={caseData.status.toUpperCase()} variant="flagged" />
      </p>
      <p>{caseData.summary}</p>
    </div>
  );
}

export default CaseSummaryCard;
