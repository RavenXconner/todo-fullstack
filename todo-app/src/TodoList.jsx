import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://todo-fullstack-wvsi.onrender.com/api/tasks/";

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editedTask, setEditedTask] = useState("");
    const [filter, setFilter] = useState("all");
    const [darkMode, setDarkMode] = useState(
        () => localStorage.getItem("theme") === "dark"
    );

    const fetchTasks = async () => {
        try {
            const response = await axios.get(API_URL);
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error.response?.data || error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const addTask = async () => {
        if (task.trim() === "") return;
        try {
            const response = await axios.post(API_URL, {
                title: task,
                completed: false,
            });
            setTasks([...tasks, response.data]);
            setTask("");
        } catch (error) {
            console.error("Error adding task:", error.response?.data || error);
        }
    };

    const removeTask = async (id) => {
        try {
            await axios.delete(`${API_URL}${id}/`);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const toggleComplete = async (id, completed) => {
        const taskToUpdate = tasks.find(task => task.id === id);
        if (!taskToUpdate) return;
        try {
            const response = await axios.put(`${API_URL}${id}/`, {
                title: taskToUpdate.title,
                completed: !completed,
            });
            setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
        } catch (error) {
            console.error("Error toggling task:", error.response?.data || error);
        }
    };

    const startEditing = (id, title) => {
        setEditIndex(id);
        setEditedTask(title);
    };

    const saveEdit = async (id) => {
        if (editedTask.trim() === "") return;
        try {
            const response = await axios.put(`${API_URL}${id}/`, {
                title: editedTask,
            });
            setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
            setEditIndex(null);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const cancelEdit = () => {
        setEditIndex(null);
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    return (
        <div className="app-container">
            <h2>To-Do List</h2>
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "☀️" : "🌙"}
            </button>

            <div className="todo-container">
                <input
                    type="text"
                    placeholder="Add a new task..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>

                <div className="filters">
                    <button onClick={() => setFilter("all")}>All</button>
                    <button onClick={() => setFilter("completed")}>Completed</button>
                    <button onClick={() => setFilter("pending")}>Pending</button>
                </div>

                <ul>
                    {filteredTasks.map((t) => (
                        <li key={t.id} className={t.completed ? "completed" : ""}>
                            <input
                                type="checkbox"
                                checked={t.completed}
                                onChange={() => toggleComplete(t.id, t.completed)}
                            />
                            {editIndex === t.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editedTask}
                                        onChange={(e) => setEditedTask(e.target.value)}
                                    />
                                    <button onClick={() => saveEdit(t.id)}>Save</button>
                                    <button onClick={cancelEdit}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <span>{t.title}</span>
                                    <button onClick={() => startEditing(t.id, t.title)}>Edit</button>
                                    <button onClick={() => removeTask(t.id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
