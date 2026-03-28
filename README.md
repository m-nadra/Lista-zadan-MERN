# Task Manager (Lista zadań)

A full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js). 

---

## 🛠️ Technologies

| Layer | Technology |
|-------|------------|
| **Frontend** | React + Vite |
| **Backend** | Express.js |
| **Database** | MongoDB |
| **Session Storage** | Redis |
| **Styling** | CSS Modules |

---

## 🏗️ Architecture

```
Lista-zadan-MERN/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components (Login, Signup, TaskTable, etc.)
│   │   ├── contexts/       # React Context (AuthContext, TaskContext)
│   │   ├── hooks/         # Custom hooks (useApi, useAuth, useTask)
│   │   ├── routes/        # Route guards (ProtectedRoute, PublicRoute)
│   │   └── styles/        # CSS Modules
│   └── Dockerfile
│
├── server/                 # Express backend
│   ├── docs/              # Swagger documentation
│   ├── models/            # Mongoose schemas (User, Task)
│   ├── routes/            # API routes (auth, tasks)
│   ├── server.js          # Main entry point
│   ├── token.js           # Redis session management
│   └── logger.js          # Winston logger
│
└── compose.yaml           # Docker Compose configuration
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/register` | User registration |
| `POST` | `/api/login` | User login |
| `POST` | `/api/logout` | User logout |
| `GET` | `/api/tasks` | Get all user tasks |
| `POST` | `/api/tasks` | Create new task |
| `PUT` | `/api/tasks/:id` | Update task |
| `DELETE` | `/api/tasks/:id` | Delete task |

---

## 📋 Features

- **User Authentication** - Register and login with secure password hashing (Argon2id)
- **Session Management** - JWT-based sessions stored in Redis (15-minute expiration)
- **Task CRUD** - Create, read, update, and delete tasks
- **Authorization** - Users can only access their own tasks
- **Form Validation** - Client-side and server-side validation
- **API Documentation** - Swagger UI available for server at `/docs`

---

## 📝 Task Schema

| Field | Type | Required |
|-------|------|----------|
| `title` | String | Yes |
| `description` | String | No |
| `date` | Date | No |
| `user` | ObjectId | Auto (from session) |

---

## 🚀 Getting Started

### Docker Deployment

```bash
docker compose --profile dev up --watch
```

---

### ❗ If you want to run app in production mode, create certs directory with your key.pem and cert.pem files!