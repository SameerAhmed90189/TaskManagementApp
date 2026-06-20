import api from "../services/api";
import "../styles/TaskCard.css";

function TaskCard({ task, onEdit, onDelete }) {
  const handleShare = async () => {
    const userId = window.prompt("Enter the user ID to share this task with:");
    if (!userId) {
      return;
    }

    const permission = window.prompt("Permission: view or edit", "view") || "view";

    try {
      await api.put(`/tasks/${task._id}/share`, {
        userId,
        permission,
      });
      window.alert("Task shared successfully");
    } catch (error) {
      window.alert(error.response?.data?.message || "Unable to share task");
    }
  };

  const handleDetails = () => {
    const attachments =
      task.attachments && task.attachments.length
        ? task.attachments.map((item) => item.filename).join(", ")
        : "None";

    window.alert(
      `Title: ${task.title}\nDescription: ${task.description || ""}\nStatus: ${task.status}\nDue: ${
        task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"
      }\nAttachments: ${attachments}`
    );
  };

  return (
    <div className="card">
      <div className="taskInfo">
        <div className="textContent">
          <h3 className="title">{task.title}</h3>

          <p className="description">{task.description}</p>
          <p className="due-date">
            Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
          </p>

          {task.attachments?.length > 0 && (
            <p className="due-date">{task.attachments.length} attachment(s)</p>
          )}
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
          <button className="detailsBtn" onClick={handleDetails}>
            Details
          </button>

          <button className="shareBtn" onClick={handleShare}>
            Share
          </button>

          <button className="editBtn" onClick={() => onEdit(task)}>
            Edit
          </button>

          <button className="deleteBtn" onClick={() => onDelete(task._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
