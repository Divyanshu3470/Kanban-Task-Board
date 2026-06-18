import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Column from "./Column";
import DraggableTask from "./DraggableTask";

function TaskCard({ tasks, setTasks }) {
    const [editingId, setEditingId] = useState(null);

    const deleteTask = (id) => {
        setTasks((prev) =>
            prev.filter((task) => task.id !== id)
        );
    };

    const updateTask = (id, updates) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? { ...task, ...updates }
                    : task
            )
        );
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        setTasks((prev) =>
            prev.map((task) =>
                task.id === active.id
                    ? {
                        ...task,
                        status: over.id,
                    }
                    : task
            )
        );
    };

    const renderTasks = (status) =>
        tasks.filter((task) => task.status === status).map((item) => (
                <DraggableTask key={item.id} task={item}>{({ listeners, attributes }) => (
                        <div className={`bg-white border-l-4 rounded-lg shadow-sm px-3 py-2 mb-2 flex items-center justify-between ${item.priority === "high"? "border-red-500": item.priority === "medium"? "border-yellow-500": "border-green-500"}`}>
                            {editingId === item.id ? (
                                <div className="flex flex-col gap-2 w-full">
                                    <input className="w-full border rounded px-3 py-2" type="text" value={item.task} onChange={(e) =>
                                            updateTask(item.id, {
                                                task: e.target.value,
                                            })
                                        }/>

                                    <div className="flex gap-2">
                                        <select className="flex-1 border rounded px-3 py-2" value={item.priority} onChange={(e) =>
                                                updateTask(item.id, {
                                                    priority: e.target.value,
                                                })
                                            }>
                                            <option value="high">High</option>
                                            <option value="medium">Medium</option>
                                            <option value="low">Low</option>
                                        </select>

                                        <button onClick={() => setEditingId(null)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3 flex-1">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${item.priority === "high"? "bg-red-100 text-red-600": item.priority === "medium"? "bg-yellow-100 text-yellow-700": "bg-green-100 text-green-600"}`}>
                                            {item.priority.toUpperCase()}
                                        </span>

                                        <h3 className="font-medium text-slate-800">
                                            {item.task}
                                        </h3>
                                    </div>

                                    <div className="flex gap-2">
                                        <button onClick={() => setEditingId(item.id)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded" >
                                            Edit
                                        </button>

                                        <button {...listeners} {...attributes} className="bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded cursor-grab" >
                                            ☰
                                        </button>

                                        <button onClick={() => deleteTask(item.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded" >
                                            ✕
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </DraggableTask>
            ));

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Column id="todo" title="TO-DO" color="bg-green-500" >
                    {renderTasks("todo")}
                </Column>

                <Column id="progress" title="IN PROGRESS" color="bg-orange-500">
                    {renderTasks("progress")}
                </Column>

                <Column id="done" title="DONE" color="bg-red-500">
                    {renderTasks("done")}
                </Column>
            </div>
        </DndContext>
    );
}

export default TaskCard;