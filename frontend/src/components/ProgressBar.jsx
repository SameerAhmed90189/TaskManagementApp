import "../styles/ProgressBar.css";
function ProgressBar({
  completedTasks,
  totalTasks,
}) {

  const percentage =
    totalTasks === 0
      ? 0
      : (
          completedTasks /
          totalTasks
        ) * 100;

  return (
  <div className="container">

    <h3>
      Progress: {Math.round(percentage)}%
    </h3>

    <div className="track">

      <div
        className="fill"
        style={{
          width: `${percentage}%`,
        }}
      />
    </div>
  </div>
);
}

export default ProgressBar;