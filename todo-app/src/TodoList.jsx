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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_URL);
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error.response?.data || error);
            setError("Failed to fetch tasks. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        document.body.className = darkMode ? "dark-mode" : "light-mode";
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const addTask = async () => {
        if (task.trim() === "") {
            setError("Task cannot be empty");
            return;
        }
        
        setLoading(true);
        try {
            const response = await axios.post(API_URL, {
                title: task,
                completed: false,
            });
            setTasks([...tasks, response.data]);
            setTask("");
            setError(null);
        } catch (error) {
            console.error("Error adding task:", error.response?.data || error);
            setError("Failed to add task. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const removeTask = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`${API_URL}${id}/`);
            setTasks(tasks.filter((task) => task.id !== id));
            setError(null);
        } catch (error) {
            console.error("Error deleting task:", error);
            setError("Failed to delete task. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const toggleComplete = async (id, completed) => {
        const taskToUpdate = tasks.find(task => task.id === id);
        if (!taskToUpdate) return;
        
        setLoading(true);
        try {
            const response = await axios.put(`${API_URL}${id}/`, {
                title: taskToUpdate.title,
                completed: !completed,
            });
            setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
            setError(null);
        } catch (error) {
            console.error("Error toggling task:", error.response?.data || error);
            setError("Failed to update task status. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const startEditing = (id, title) => {
        setEditIndex(id);
        setEditedTask(title);
    };

    const saveEdit = async (id) => {
        if (editedTask.trim() === "") {
            setError("Task cannot be empty");
            return;
        }
        
        setLoading(true);
        try {
            const response = await axios.put(`${API_URL}${id}/`, {
                title: editedTask,
                completed: tasks.find(t => t.id === id)?.completed || false,
            });
            setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
            setEditIndex(null);
            setError(null);
        } catch (error) {
            console.error("Error updating task:", error);
            setError("Failed to update task. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const cancelEdit = () => {
        setEditIndex(null);
        setError(null);
    };

    const clearCompleted = async () => {
        setLoading(true);
        try {
            const completedTasks = tasks.filter(task => task.completed);
            await Promise.all(
                completedTasks.map(task => axios.delete(`${API_URL}${task.id}/`))
            );
            setTasks(tasks.filter(task => !task.completed));
            setError(null);
        } catch (error) {
            console.error("Error clearing completed tasks:", error);
            setError("Failed to clear completed tasks. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    const handleKeyDown = (e, action) => {
        if (e.key === "Enter") {
            action();
        }
    };

    return (
        <div className={`app-container ${darkMode ? "dark" : "light"}`}>
            <div className="header">
                <h1>To-Do List</h1>
                <button 
                    className="theme-toggle" 
                    onClick={() => setDarkMode(!darkMode)}
                    aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
                >
                    {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>
            </div>

            <div className="todo-container">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, addTask)}
                        disabled={loading}
                    />
                    <button 
                        onClick={addTask}
                        disabled={loading || !task.trim()}
                    >
                        {loading ? "Adding..." : "Add Task"}
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="controls">
                    <div className="filters">
                        <button 
                            className={filter === "all" ? "active" : ""}
                            onClick={() => setFilter("all")}
                        >
                            All
                        </button>
                        <button 
                            className={filter === "pending" ? "active" : ""}
                            onClick={() => setFilter("pending")}
                        >
                            Pending
                        </button>
                        <button 
                            className={filter === "completed" ? "active" : ""}
                            onClick={() => setFilter("completed")}
                        >
                            Completed
                        </button>
                    </div>
                    
                    {tasks.some(task => task.completed) && (
                        <button 
                            className="clear-completed"
                            onClick={clearCompleted}
                            disabled={loading}
                        >
                            Clear Completed
                        </button>
                    )}
                </div>

                {loading && !tasks.length ? (
                    <div className="loading">Loading tasks...</div>
                ) : filteredTasks.length === 0 ? (
                    <div className="empty-state">
                        {filter === "all" 
                            ? "No tasks yet. Add one above!" 
                            : filter === "completed" 
                                ? "No completed tasks yet" 
                                : "No pending tasks"}
                    </div>
                ) : (
                    <ul className="task-list">
                        {filteredTasks.map((t) => (
                            <li 
                                key={t.id} 
                                className={`task-item ${t.completed ? "completed" : ""} ${editIndex === t.id ? "editing" : ""}`}
                            >
                                <div className="task-content">
                                    <input
                                        type="checkbox"
                                        checked={t.completed}
                                        onChange={() => toggleComplete(t.id, t.completed)}
                                        disabled={loading}
                                        aria-label={t.completed ? "Mark as pending" : "Mark as completed"}
                                    />
                                    
                                    {editIndex === t.id ? (
                                        <div className="edit-group">
                                            <input
                                                type="text"
                                                value={editedTask}
                                                onChange={(e) => setEditedTask(e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(e, () => saveEdit(t.id))}
                                                autoFocus
                                            />
                                            <div className="edit-actions">
                                                <button 
                                                    onClick={() => saveEdit(t.id)}
                                                    disabled={loading || !editedTask.trim()}
                                                >
                                                    {loading ? "Saving..." : "Save"}
                                                </button>
                                                <button onClick={cancelEdit} disabled={loading}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="task-text">{t.title}</span>
                                            <div className="task-actions">
                                                <button 
                                                    onClick={() => startEditing(t.id, t.title)}
                                                    disabled={loading}
                                                    aria-label="Edit task"
                                                >
                                                    ✏️
                                                </button>
                                                <button 
                                                    onClick={() => removeTask(t.id)}
                                                    disabled={loading}
                                                    aria-label="Delete task"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {tasks.length > 0 && (
                    <div className="stats">
                        {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"} displayed
                        {filter === "all" && (
                            <span>
                                ({tasks.filter(t => !t.completed).length} pending, {tasks.filter(t => t.completed).length} completed)
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}