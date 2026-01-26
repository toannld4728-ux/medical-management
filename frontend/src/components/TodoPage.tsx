import { useEffect, useState } from "react";
import { getTodos, createTodo, deleteTodo } from "../services/todoService";
import { Todo } from "../types/todo";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load todos from backend
  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      console.error(err);
      setError("Không tải được danh sách todo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  // Create todo
  const handleCreate = async () => {
    if (!title.trim()) return;

    try {
      await createTodo({ title });
      setTitle("");
      loadTodos();
    } catch (err) {
      console.error(err);
      alert("Tạo todo thất bại");
    }
  };

  // Delete todo
  const handleDelete = async (id: number) => {
    if (!window.confirm("Xóa todo này?")) return;

    try {
      await deleteTodo(id);
      loadTodos();
    } catch (err) {
      console.error(err);
      alert("Xóa todo thất bại");
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: "0 auto" }}>
      <h2>📝 Todo List (Backend + DB thật)</h2>

      {/* Create */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Nhập nội dung todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={handleCreate}>Add</button>
      </div>

      {/* Status */}
      {loading && <p>⏳ Đang tải...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 8,
              borderBottom: "1px solid #ddd",
            }}
          >
            <span>{todo.title}</span>
            <button onClick={() => handleDelete(todo.id)}>❌</button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && !loading && (
        <p>Chưa có todo nào trong database</p>
      )}
    </div>
  );
}
