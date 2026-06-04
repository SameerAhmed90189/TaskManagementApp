import TaskCard from "./TaskCard";
import "../styles/TaskList.css";

function TaskList({
  tasks,
  onEdit,
  onDelete,
  filter,
  setFilter
}) {

  if (tasks.length === 0) {
    return (
      <h3>
        No Tasks Found
      </h3>
    );
  }

return (
 <div className="tasklist-container">

  <div className="tasklist-header">

    <h2 className="tasklist-heading">
      Tasks ({tasks.length})
    </h2>

    <select
      className="tasklist-filter"
      value={filter}
      onChange={(e) =>
        setFilter(e.target.value)
      }
    >
      <option value="All">
        All Status
      </option>

      <option value="Pending">
        Pending
      </option>

      <option value="In Progress">
        In Progress
      </option>

      <option value="Completed">
        Completed
      </option>

    </select>

  </div>

  <div className="task-list-scroll">

    {tasks.map((task) => (
      <TaskCard
        key={task._id}
        task={task}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ))}

  </div>

</div>
);
}

export default TaskList;