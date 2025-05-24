// In-memory storage for todos
let todos = [];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Get all todos
      res.status(200).json(todos);
      break;

    case 'POST':
      // Create a new todo
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ error: 'Text is required' });
      }
      const newTodo = {
        id: Date.now().toString(),
        text,
        completed: false
      };
      todos.push(newTodo);
      res.status(201).json(newTodo);
      break;

    case 'PUT':
      // Update a todo
      const { id, completed } = req.body;
      if (!id) {
        return res.status(400).json({ error: 'ID is required' });
      }
      const todoIndex = todos.findIndex(todo => todo.id === id.toString());
      if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      todos[todoIndex] = { ...todos[todoIndex], completed };
      res.status(200).json(todos[todoIndex]);
      break;

    case 'DELETE':
      // Delete a todo
      const { id: todoId } = req.query;
      if (!todoId) {
        return res.status(400).json({ error: 'ID is required' });
      }
      const deleteIndex = todos.findIndex(todo => todo.id === todoId.toString());
      if (deleteIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      const deletedTodo = todos[deleteIndex];
      todos = todos.filter(todo => todo.id !== todoId.toString());
      res.status(200).json(deletedTodo);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
} 