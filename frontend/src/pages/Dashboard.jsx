import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import Navbar from "../components/Navbar";
import ProgressBar from "../components/ProgressBar";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import "../styles/Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const [tasks, setTasks] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

 

  const [editingTask,
    setEditingTask] =
    useState(null);
   const getTasks = async () => {

    try {

      const res =
        await api.get("/tasks");

      setTasks(res.data);

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {
    

    getTasks();
     // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  
  const handleSubmit =
    async (formData) => {

      try {

        if (editingTask) {

          await api.put(
            `/tasks/${editingTask._id}`,
            formData
          );

          setEditingTask(null);

        } else {

          await api.post(
            "/tasks",
            formData
          );

        }

        getTasks();

      } catch (error) {

        console.error(error);

      }
    };

  const handleDelete =
    async (id) => {

      try {

        await api.delete(
          `/tasks/${id}`
        );

        getTasks();

      } catch (error) {

        console.error(error);

      }
    };

  const handleLogout =
    () => {

      localStorage.removeItem(
        "token"
      );

      navigate("/");
    };

  const filteredTasks =
    tasks
      .filter((task) => {

        const matchesSearch =
  task.title
    .toLowerCase()
    .includes(search.toLowerCase()) ||

  task.description
    .toLowerCase()
    .includes(search.toLowerCase()) ||

  task.status
    .toLowerCase()
    .includes(search.toLowerCase());

        const matchesFilter =
          filter === "All"
            ? true
            : task.status === filter;

        return (
          matchesSearch &&
          matchesFilter
        );
      });

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length;

 return (
  <div className="dashboard-container">

    <Navbar
      search={search}
      setSearch={setSearch}
      handleLogout={handleLogout}
    />

    <div className="dashboard-content">

      <div className="dashboard-progress">
        <ProgressBar
          completedTasks={completedTasks}
          totalTasks={tasks.length}
        />
      </div>

      <div className="dashboard-main">

        <div className="dashboard-tasklist">
         <TaskList
             tasks={filteredTasks}
              onEdit={setEditingTask}
                  onDelete={handleDelete}
                   filter={filter}
  setFilter={setFilter}
/>
        </div>

        <div className="dashboard-taskform">
          <TaskForm
            editingTask={editingTask}
            onSubmit={handleSubmit}
          />
        </div>

      </div>

    </div>

  </div>
);
}

export default Dashboard;