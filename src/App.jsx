import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const addTask = () => {
    if (!title || !date) return;
    const newTask = { title, date };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTitle("");
    setDate("");
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  return (
    <div className="container">
      <h1>📋 Student Task Manager</h1>
      <div className="form">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, i) => (
          <li key={i}>
            {task.title} - {task.date}
            <button onClick={() => deleteTask(i)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
