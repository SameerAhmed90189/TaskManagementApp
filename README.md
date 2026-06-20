# TaskManagementApp

A full-stack task management app built with React, Express, MongoDB, JWT authentication, task collaboration, notifications, analytics, dark mode, and task attachments.

## Features

- User registration and login with JWT
- Create, read, update, and delete tasks
- Task fields: title, description, status, due date, owner, shared users, and attachments
- Search and status filters
- Completed-task progress indicator
- Share tasks with another user using view or edit permissions
- Real-time notifications with Socket.IO
- Notification history sidebar
- Analytics dashboard with task summary and monthly trends
- Dark mode toggle
- Basic frontend and backend tests

## Tech Stack

- Frontend: React, Vite, React Router, Axios, Recharts, Socket.IO Client
- Backend: Node.js, Express, MongoDB, Mongoose, Socket.IO
- Auth: JWT, bcryptjs
- Testing: Jest, Supertest, Vitest, React Testing Library

## Project Structure

```text
TaskManagementApp/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    tests/
    validators/
    app.js
    server.js
  frontend/
    src/
      components/
      pages/
      services/
      styles/
```

## Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
Mongo_URI=your_mongodb_connection_string
jwt_key=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Run the backend:

```bash
npm run dev
```

Run backend tests:

```bash
npm test
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Build and test:

```bash
npm run build
npm test
```

## API Routes

Authentication:

- `POST /auth/register`
- `POST /auth/login`

Tasks:

- `POST /tasks`
- `GET /tasks`
- `GET /tasks/shared`
- `GET /tasks/:id`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

Collaboration:

- `PUT /tasks/:id/share`
- `GET /tasks/:id/collaborators`
- `PUT /tasks/:id/share/:userId`
- `DELETE /tasks/:id/share/:userId`

Notifications:

- `GET /notifications`

Analytics:

- `GET /analytics/overview`
- `GET /analytics/trends`

## Author

Sameer Ahmed
