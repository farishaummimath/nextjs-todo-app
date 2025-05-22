// In-memory storage for todos (we'll replace this with a database later)
let todos = [
  { id: 1, text: 'Learn Next.js', completed: false },
  { id: 2, text: 'Build an API', completed: false }
];

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle GET request - return all todos
  if (req.method === 'GET') {
    res.status(200).json(todos);
    return;
  }

  // Handle POST request - create new todo
  if (req.method === 'POST') {
    try {
      const { text } = req.body;
      
      // Validate input
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Text is required and must be a string' });
      }

      // Create new todo
      const newTodo = {
        id: todos.length + 1,
        text,
        completed: false
      };

      // Add to todos array
      todos.push(newTodo);

      // Return the new todo
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ error: 'Error creating todo' });
    }
    return;
  }

  // Handle PUT request - update todo
  if (req.method === 'PUT') {
    try {
      const { id, completed } = req.body;
      
      // Validate input
      if (typeof id !== 'number' || typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Invalid input' });
      }

      // Find and update todo
      const todoIndex = todos.findIndex(todo => todo.id === id);
      if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      todos[todoIndex] = { ...todos[todoIndex], completed };
      res.status(200).json(todos[todoIndex]);
    } catch (error) {
      res.status(500).json({ error: 'Error updating todo' });
    }
    return;
  }

  // Handle DELETE request - delete todo
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      
      // Validate input
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: 'Invalid todo ID' });
      }

      // Find and delete todo
      const todoIndex = todos.findIndex(todo => todo.id === Number(id));
      if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      const deletedTodo = todos[todoIndex];
      todos = todos.filter(todo => todo.id !== Number(id));
      res.status(200).json(deletedTodo);
    } catch (error) {
      res.status(500).json({ error: 'Error deleting todo' });
    }
    return;
  }

  // Handle unsupported methods
  res.status(405).json({ error: 'Method not allowed' });
} 