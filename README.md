# TaskFlow Pro Backend

## Installation Guide
### Step 1: Clone the Repository
   ```bash
git clone https://github.com/Rabby3075/taskflow-pro-backend.git
cd taskflow-pro-backend
   ```
### Step 2: Install Dependencies
```bash
npm install
```
### Step 3: Copy .env.example 
```bash
cp .env.example .env
```
### Step 4: Run Docker
Make sure Docker desktop is running and then execute:
```bash
docker compose up -d
```
### Step 5: Run the server
```bash
npm start
```
The server will start at 
```arduino
http://localhost:5000
```
Health Checkpoint:
```bash
GET /api/health
```
## Folder Architecture

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic (register, login)
│   │   └── taskController.js    # Task CRUD operations
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication middleware
│   │   ├── errorHandler.js      # Global error handling middleware
│   │   └── validation.js        # Request validation schemas (Joi)
│   ├── models/
│   │   ├── Users.js             # User schema and model
│   │   └── Tasks.js             # Task schema and model
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication routes (register, login)
│   │   └── taskRoutes.js        # Task routes (CRUD operations)
│   ├── utils/
│   │   └── generateToken.js     # JWT token generation utility
│   └── server.js                # Express app entry point
├── docker-compose.yml           # Docker Compose configuration
├── Dockerfile                   # Docker image configuration
├── package.json                 # Project dependencies and scripts
└── README.md                    # Project documentation
```

### Directory Descriptions

- **`src/config/`** - Configuration files for database connections and other services
- **`src/controllers/`** - Business logic handlers for each route endpoint
- **`src/middleware/`** - Custom middleware functions (authentication, validation, error handling)
- **`src/models/`** - Mongoose schemas and models defining database structure
- **`src/routes/`** - Route definitions that map URLs to controller functions
- **`src/utils/`** - Reusable utility functions and helpers
- **`src/server.js`** - Main application entry point that initializes Express and connects all components

## Database Choice & Structure

### Why MongoDB?

- It provides flexible schema design
- It integrates well with JavaScript applications
- It is scalable and widely used in production systems

### Database Structure

#### User Collection

```js
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  createdAt: Date,
}
```

#### Task Collection

```js
{
  _id: ObjectId,
  user_id: ObjectId,
  title: String,
  description: String,
  status: String (enum: ["pending", "in-progress", "completed"]),
  dueDate: Date,
  createdAt: Date,
}
```

- Each task belongs to a specific user
- Users can only access their own tasks
