type ReviewProgressProps = {
  percent: number;
};

function ReviewProgress({ percent }: ReviewProgressProps) {
  return (
    <div className="dashboard-panel">
      <h3>Review progress</h3>
      <div className="progress-bar-outer">
        {/* the width comes from the prop, React writes it into the style */}
        <div className="progress-bar-inner" style={{ width: percent + "%" }} />
      </div>
      <p>{percent}% of evidence reviewed</p>
    </div>
  );
}

export default ReviewProgress;
