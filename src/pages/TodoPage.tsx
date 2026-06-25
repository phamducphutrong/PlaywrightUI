import { useState } from 'react'
import '../styles/shared.css'
import './TodoPage.css'

interface Todo {
  id: number
  text: string
  done: boolean
}

let nextId = 4

const initialTodos: Todo[] = [
  { id: 1, text: 'Học Playwright cơ bản', done: true },
  { id: 2, text: 'Viết test cho form login', done: false },
  { id: 3, text: 'Thực hành locator strategies', done: false },
]

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all')

  const addTodo = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setTodos((prev) => [...prev, { id: nextId++, text: trimmed, done: false }])
    setInput('')
  }

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const filtered = todos.filter((t) => {
    if (filter === 'active') return !t.done
    if (filter === 'done') return t.done
    return true
  })

  const remaining = todos.filter((t) => !t.done).length

  return (
    <div className="page" data-testid="todo-page">
      <header className="page-header">
        <h1>Todo List</h1>
        <p>Bài tập CRUD cơ bản — thêm, hoàn thành, xóa, lọc</p>
      </header>

      <div className="card">
        <div className="todo-input-row">
          <input
            type="text"
            className="input"
            placeholder="Thêm công việc mới..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            data-testid="todo-input"
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={addTodo}
            data-testid="todo-add-btn"
          >
            Thêm
          </button>
        </div>

        <div className="todo-filters" data-testid="todo-filters">
          {(['all', 'active', 'done'] as const).map((f) => (
            <button
              key={f}
              type="button"
              className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilter(f)}
              data-testid={`filter-${f}`}
            >
              {f === 'all' ? 'Tất cả' : f === 'active' ? 'Chưa xong' : 'Đã xong'}
            </button>
          ))}
        </div>

        <ul className="todo-list" data-testid="todo-list">
          {filtered.length === 0 ? (
            <li className="todo-empty" data-testid="todo-empty">
              Không có công việc nào
            </li>
          ) : (
            filtered.map((todo) => (
              <li
                key={todo.id}
                className={`todo-item${todo.done ? ' todo-done' : ''}`}
                data-testid={`todo-item-${todo.id}`}
              >
                <label className="todo-label">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                    data-testid={`todo-check-${todo.id}`}
                  />
                  <span data-testid={`todo-text-${todo.id}`}>{todo.text}</span>
                </label>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteTodo(todo.id)}
                  data-testid={`todo-delete-${todo.id}`}
                >
                  Xóa
                </button>
              </li>
            ))
          )}
        </ul>

        <p className="todo-remaining" data-testid="todo-remaining">
          Còn lại: <strong>{remaining}</strong> công việc
        </p>
      </div>
    </div>
  )
}
