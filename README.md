# Next.js Todo Application

A modern, responsive Todo application built with Next.js, featuring a clean UI, smooth animations, and real-time updates.

## Features

- ✨ Modern and responsive design
- 🎨 Smooth animations and transitions
- ✅ Todo management (Create, Read, Update, Delete)
- 🔄 Real-time state updates
- 📱 Mobile-friendly interface
- 🎯 API integration
- 🎭 Interactive UI elements

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nextjs-learning
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser.

## Project Structure

```
nextjs-learning/
├── pages/              # Next.js pages
│   ├── index.js       # Main page with Todo list
│   ├── about.js       # About page
│   ├── blog.js        # Blog page
│   └── api/           # API routes
│       ├── hello.js   # Hello World API
│       └── todos.js   # Todo CRUD operations
├── styles/            # CSS modules
│   ├── Home.module.css
│   └── Todos.module.css
└── public/           # Static assets
```

## API Endpoints

### Todos API

- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos` - Update a todo
- `DELETE /api/todos?id=<id>` - Delete a todo

### Hello World API

- `GET /api/hello` - Returns a greeting message

## Features in Detail

### Todo Management

- **Create**: Add new todos with the input form
- **Read**: View all todos in a clean, organized list
- **Update**: Toggle todo completion status
- **Delete**: Remove todos with a single click

### UI/UX Features

- **Animations**:
  - Fade-in effects for new todos
  - Smooth hover transitions
  - Loading state animations
  - Error message shake effect

- **Responsive Design**:
  - Adapts to all screen sizes
  - Mobile-first approach
  - Touch-friendly interface

- **Visual Feedback**:
  - Hover effects on interactive elements
  - Clear completion status indicators
  - Error state handling
  - Loading states

## Styling

The application uses CSS Modules for styling, with two main style files:

- `Home.module.css`: Main layout and page styles
- `Todos.module.css`: Todo-specific component styles

### Key Style Features

- Gradient backgrounds
- Modern shadow effects
- Smooth transitions
- Responsive breakpoints
- Interactive hover states

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- ESLint for code linting
- Prettier for code formatting
- CSS Modules for scoped styling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- All contributors who have helped improve this project 