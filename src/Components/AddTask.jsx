import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";

function AddTask() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const formData = (e) => {
    e.preventDefault();

    const task = e.target.task.value.trim();

    if (!task) return;

    const newTask = {
      id: Date.now(),
      task,
      priority: e.target.priority.value,
      status: "todo",
    };

    setTasks((prev) => [...prev, newTask]);

    e.target.reset();
  };

  const clearBoard = () => {
    localStorage.removeItem("tasks");
    setTasks([]);
  };

  const filteredTasks = tasks.filter((task) =>
    task.task.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-5xl font-bold mb-8 text-slate-800">
          Kanban Task Board
        </h1>

        <form onSubmit={formData} className="flex flex-col md:flex-row gap-4 mb-6">
          <input type="text" name="task" placeholder="Enter task..." required className="flex-1 border rounded-xl px-4 py-3" />
          <select name="priority" className="border rounded-xl px-4 py-3" >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl" >
            Add Task
          </button>

          <button type="button" onClick={clearBoard} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl" >
            Clear Board
          </button>
        </form>

        <input type="text" placeholder="Search Tasks..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full mb-6 border rounded-xl px-4 py-3" />

        <TaskCard tasks={filteredTasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default AddTask;