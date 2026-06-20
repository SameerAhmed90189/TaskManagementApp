import { useState, useEffect } from "react";
import "../styles/TaskForm.css";

function TaskForm({ onSubmit, editingTask }) {
  const emptyForm = {
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
    attachments: [],
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        status: editingTask.status || "Pending",
        dueDate: editingTask.dueDate ? editingTask.dueDate.split("T")[0] : "",
        attachments: editingTask.attachments || [],
      });
    } else {
      setFormData(emptyForm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAttachmentChange = async (e) => {
    const files = Array.from(e.target.files || []);

    const attachments = await Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () =>
              resolve({
                filename: file.name,
                url: reader.result,
              });
            reader.readAsDataURL(file);
          })
      )
    );

    setFormData({
      ...formData,
      attachments,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(emptyForm);
  };

  return (
    <div className="formCard">
      <form className="form" onSubmit={handleSubmit}>
        <h2>{editingTask ? "Update Task" : "Add New Task"}</h2>

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
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <input className="input" type="file" multiple onChange={handleAttachmentChange} />

        {formData.attachments.length > 0 && (
          <p className="attachmentCount">
            {formData.attachments.length} attachment(s) selected
          </p>
        )}

        <button className="submitBtn" type="submit">
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
