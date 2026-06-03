import {
  useState,
  useEffect,
} from "react";

function TaskForm({
  onSubmit,
  editingTask,
}) {

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      status: "Pending",
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
    <form
      onSubmit={
        handleSubmit
      }
    >

      <h2>
        {editingTask
          ? "Update Task"
          : "Add New Task"}
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Enter task title"
        value={
          formData.title
        }
        onChange={
          handleChange
        }
      />

      <textarea
        name="description"
        placeholder="Enter task description"
        value={
          formData.description
        }
        onChange={
          handleChange
        }
      />

      <select
        name="status"
        value={
          formData.status
        }
        onChange={
          handleChange
        }
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
        type="submit"
      >
        {editingTask
          ? "Update Task"
          : "Add Task"}
      </button>

    </form>
  );
}

export default TaskForm;