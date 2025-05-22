import React, { useState, useEffect } from 'react';
import styles from '../styles/Todos.module.css';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();
      setTodos(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Add new todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTodo }),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      const data = await response.json();
      setTodos([...todos, data]);
      setNewTodo('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>

      {/* Add Todo Form */}
      <form onSubmit={addTodo} className={styles.form}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Add Todo
        </button>
      </form>

      {/* Error Message */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Loading State */}
      {loading && <p>Loading todos...</p>}

      {/* Todo List */}
      <ul className={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} className={styles.todoItem}>
            <span className={styles.todoText}>{todo.text}</span>
            <span className={styles.todoStatus}>
              {todo.completed ? '✅' : '⭕'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos; 