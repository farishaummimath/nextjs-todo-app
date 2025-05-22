import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import todoStyles from '../styles/Todos.module.css';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
    fetchHelloWorld();
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

  // Fetch hello world API
  const fetchHelloWorld = async () => {
    try {
      const response = await fetch('/api/hello');
      const data = await response.json();
      setApiResponse(data);
    } catch (err) {
      console.error('Error fetching hello world:', err);
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

  // Toggle todo completion
  const toggleTodo = async (id, currentStatus) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: Number(id), 
          completed: !currentStatus 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo = await response.json();
      setTodos(todos.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`/api/todos?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        {/* Navigation Section */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li><a href="/about" className={styles.navLink}>Go to About page</a></li>
            <li><a href="/blog" className={styles.navLink}>Go to Blog</a></li>
            <li><a href="/router-demo" className={styles.navLink}>Router Methods Demo</a></li>
          </ul>
        </nav>

        {/* Hello World API Response and Todo List Section */}
        <div className={styles.contentSections}>
          {/* Hello World API Response */}
          {apiResponse && (
            <div className={styles.apiResponse}>
              <h2 className={styles.sectionTitle}>Hello World API Response</h2>
              <pre className={styles.code}>
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </div>
          )}

          {/* Todo List Section */}
          <div className={styles.todoSection}>
            <h2 className={styles.sectionTitle}>Todo List</h2>
            
            {/* Add Todo Form */}
            <form onSubmit={addTodo} className={todoStyles.form}>
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo..."
                className={todoStyles.input}
              />
              <button type="submit" className={todoStyles.button}>
                Add Todo
              </button>
            </form>

            {/* Error Message */}
            {error && <p className={todoStyles.error}>{error}</p>}

            {/* Loading State */}
            {loading && <p>Loading todos...</p>}

            {/* Todo List */}
            <ul className={todoStyles.list}>
              {todos.map((todo) => (
                <li key={todo.id} className={todoStyles.todoItem}>
                  <div className={todoStyles.todoContent}>
                    <button
                      onClick={() => toggleTodo(todo.id, todo.completed)}
                      className={todoStyles.toggleButton}
                      aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {todo.completed ? '✅' : '⭕'}
                    </button>
                    <span className={`${todoStyles.todoText} ${todo.completed ? todoStyles.completed : ''}`}>
                      {todo.text}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className={todoStyles.deleteButton}
                    aria-label="Delete todo"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            Next.js
          </span>
        </a>
      </footer>
    </div>
  );
} 