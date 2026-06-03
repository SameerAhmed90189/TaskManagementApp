import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  onEdit,
  onDelete,
}) {

  if (tasks.length === 0) {
    return (
      <h3>
        No Tasks Found
      </h3>
    );
  }

  return (
    <div>

      <h2>
        Tasks
        {" "}
        ({tasks.length})
      </h2>

      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

    </div>
  );
}

export default TaskList;