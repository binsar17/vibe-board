import { useState, useEffect } from "react";
import "./App.css";

const COLUMNS = [
  { id: "todo", title: "📌 To Do" },
  { id: "progress", title: "⏳ In Progress" },
  { id: "done", title: "✅ Done" },
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("vibe-tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  // Simpan ke localStorage setiap kali tasks berubah
  useEffect(() => {
    localStorage.setItem("vibe-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newTask = {
      id: Date.now().toString(),
      text: input,
      status: "todo",
    };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const moveTask = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app-wrapper">
      <div className="container">
        <h1 className="title">🗂️ Vibe Board</h1>
        
        <form onSubmit={addTask} className="add-form">
          <input
            type="text"
            placeholder="Mau ngapain hari ini? Tambah tugas baru..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="task-input"
          />
          <button type="submit" className="btn-add">Tambah Tugas</button>
        </form>

        <div className="board">
          {COLUMNS.map((col) => (
            <div key={col.id} className="column">
              <div className="column-header">
                <h2>{col.title}</h2>
                <span className="task-count">
                  {tasks.filter((t) => t.status === col.id).length}
                </span>
              </div>
              
              <div className="task-list">
                {tasks
                  .filter((task) => task.status === col.id)
                  .map((task) => (
                    <div key={task.id} className="task-card">
                      <p>{task.text}</p>
                      <div className="task-actions">
                        {col.id !== "todo" && (
                          <button onClick={() => moveTask(task.id, "todo")} title="Pindah ke To Do">⬅️</button>
                        )}
                        {col.id !== "progress" && (
                          <button onClick={() => moveTask(task.id, "progress")} title="Pindah ke In Progress">⏳</button>
                        )}
                        {col.id !== "done" && (
                          <button onClick={() => moveTask(task.id, "done")} title="Pindah ke Done">✅</button>
                        )}
                        <button onClick={() => deleteTask(task.id)} className="btn-delete" title="Hapus">🗑️</button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;