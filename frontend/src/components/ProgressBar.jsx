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
    <div>

      <h3>
        Progress:
        {" "}
        {Math.round(percentage)}
        %
      </h3>

      <div>

        <div
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}

export default ProgressBar;