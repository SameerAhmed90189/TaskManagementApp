import {
  useState,
  useEffect,
} from "react";
import "../styles/TaskForm.css";

function TaskForm({
  onSubmit,
  editingTask,
}) {

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      status: "Pending",
      dueDate:""
    });

  useEffect(() => {

    if (editingTask) {
      setFormData({
        title:
          editingTask.title,
        description:
          editingTask.description,
        status:
          editingTask.status,
           dueDate: editingTask.dueDate
    ? editingTask.dueDate.split("T")[0]
    : ""
      });
    }
         else {
        // eslint-disable-next-line react-hooks/exhaustive-deps
       setFormData({
         title: "",
         description: "",
         status: "Pending",
    });
  }
  }, [editingTask]);

  const handleChange = (
    e
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = (
    e
  ) => {

    e.preventDefault();

    onSubmit(formData);

    setFormData({
      title: "",
      description: "",
      status: "Pending",
    });

  };

 return (
  <div className="formCard">

    <form
      className="form"
      onSubmit={handleSubmit}
    >

      <h2>
        {editingTask
          ? "Update Task"
          : "Add New Task"}
      </h2>

      <input
        className="input"
        type="text"
        name="title"
        placeholder="Enter task title"
        value={formData.title}
        onChange={handleChange}
      />

      <textarea
        className="textarea"
        name="description"
        placeholder="Enter task description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
  className="input"
  type="date"
  name="dueDate"
  value={formData.dueDate}
  onChange={handleChange}
/>

      <select
        className="select"
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
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

      <button
        className="submitBtn"
        type="submit"
      >
        {editingTask
          ? "Update Task"
          : "Add Task"}
      </button>

    </form>

  </div>
);
}

export default TaskForm;