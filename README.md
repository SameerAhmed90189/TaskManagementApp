# TaskManagementApp

A comprehensive full-stack task management application built as part of a Developer Hubs internship project. This application enables users to create, manage, and organize tasks with authentication and security features.

## 📋 Project Overview

TaskManagementApp is a modern web application designed to help users efficiently manage their tasks. The application follows a client-server architecture with a React-based frontend and Node.js/Express backend, with MongoDB as the database.

## 🏗️ Architecture

The project is organized into two main directories:

### **Backend** (`/backend`)
A Node.js/Express REST API server providing authentication and task management endpoints.

**Key Technologies:**
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing and encryption
- **Helmet** - HTTP security middleware
- **CORS** - Cross-Origin Resource Sharing support
- **Morgan** - HTTP request logging

**Core Features:**
- User authentication (registration & login)
- Task CRUD operations
- Input validation
- Error handling middleware
- Security best practices with Helmet

### **Frontend** (`/frontend`)
A React application providing a modern, responsive user interface.

**Key Technologies:**
- **React 19** - UI framework
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code quality and style enforcement

**Core Features:**
- User authentication pages
- Task dashboard and management interface
- Real-time API integration
- Responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance (local or cloud)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

Start the development server:
```bash
npm run dev
```

Or start in production mode:
```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## 📦 Project Structure

```
TaskManagementApp/
├── backend/
│   ├── config/          # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware (auth, error handling, etc.)
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── validators/       # Input validation logic
│   ├── tests/            # Unit and integration tests
│   ├── app.js           # Express app configuration
│   ├── server.js        # Server entry point
│   └── package.json     # Dependencies and scripts
│
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── App.jsx      # Main App component
│   │   └── main.jsx     # React entry point
│   ├── public/          # Static assets
│   ├── index.html       # HTML template
│   ├── vite.config.js   # Vite configuration
│   ├── eslint.config.js # ESLint configuration
│   └── package.json     # Dependencies and scripts
│
├── task_manager_full_architecture.svg  # System architecture diagram
└── README.md            # This file
```

## 🔌 API Endpoints

### Authentication Routes (`/auth`)
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Task Routes (`/tasks`)
- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a specific task
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## 🧪 Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## 📝 Scripts

### Backend Scripts
- `node server.js` Starts the Backend 
- `npm test` - Run test suite

### Frontend Scripts
- `npm run dev` - Start development server
- `npm test` - Run test suite

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- CORS protection
- Helmet security headers
- Input validation and sanitization
- Error handling middleware

## 🎨 UI/UX

The frontend uses:
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **React Router** - Smooth client-side navigation
- **Axios** - Efficient API communication with interceptors
- `**Cross Platform**` - Optimized for both Mobile and Laptop

## 📚 Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS, Axios |
| Backend | Express.js, Node.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| Testing | Jest, Vitest, Supertest |
| Code Quality | ESLint |
| Security | Helmet, CORS, express-validator |

## 🤝 Contributing

This is a project for the Developer Hubs internship. Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👤 Author

Created by [Sameer Ahmed](https://github.com/SameerAhmed90189)

## 📞 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Happy Task Managing! 🎯**
