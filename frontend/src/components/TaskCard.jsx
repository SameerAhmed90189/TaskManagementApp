function TaskCard({
  task,
  onEdit,
  onDelete,
}) {

  return (
    <div>

      <h3>
        {task.title}
      </h3>

      <p>
        {task.description}
      </p>

      <span>
        {task.status}
      </span>

      <div>

        <button
          onClick={() =>
            onEdit(task)
          }
        >
          Edit
        </button>

        <button
          onClick={() =>
            onDelete(task._id)
          }
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;