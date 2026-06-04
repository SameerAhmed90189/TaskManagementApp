import "../styles/TaskCard.css";
function TaskCard({
  task,
  onEdit,
  onDelete,
}) {

return (
  <div className="card">

    <div className="taskInfo">

      <div className="textContent">
        <h3 className="title">
          {task.title}
        </h3>

        <p className="description">
          {task.description}
        </p>
      </div>

      <span
        className={`status ${
          task.status === "Completed"
            ? "completed"
            : task.status === "In Progress"
            ? "progress"
            : "pending"
        }`}
      >
        {task.status}
      </span>

      <div className="actions">

        <button
          className="editBtn"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="deleteBtn"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>

      </div>

    </div>

  </div>
);
}

export default TaskCard;