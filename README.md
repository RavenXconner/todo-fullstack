# ToDoList-FastAPI

## Backend (FastAPI) Setup

### Prerequisites
- Python 3.7+
- pip package manager

### Installation
1. Navigate to the `fastapi-app` directory:
   ```bash
   cd fastapi-app
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Database Setup
1. The application uses SQLite by default (configured in `database.py`).
2. To initialize the database, run:
   ```bash
   python main.py
   ```
   This will create the database file and tables.

### Running the Backend
Start the FastAPI development server:
```bash
uvicorn main:app --reload
```

The API will be available at:
- http://localhost:8000
- Interactive docs at http://localhost:8000/docs

## Frontend (React) Setup

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
1. Navigate to the `todo-app` directory:
   ```bash
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Frontend
Start the development server:
```bash
npm run dev
```

The application will be available at:
- http://localhost:5173

### Building for Production
To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Connecting Frontend to Backend
The frontend is pre-configured to connect to the backend API. By default it expects:
- Backend running on http://localhost:8000
- API endpoints under `/api/tasks/`

## Deployment
For production deployment, consider:
1. Using a production-grade ASGI server like Uvicorn with Gunicorn for the backend
2. Configuring environment variables for database connections
3. Setting up proper CORS configuration for the API
4. Using a reverse proxy like Nginx

## Troubleshooting
- If the frontend can't connect to the backend, check:
  - Both servers are running
  - No CORS errors in browser console
  - Correct API URL in `src/TodoList.jsx`
- For database issues, verify:
  - SQLite file permissions
  - Database tables are created

## List of API ENDPOINTS
-GET /api/tasks/
-GET /api/tasks/{task_id}
-POST /api/tasks/
-PUT /api/tasks/{task_id}
-DELETE /api/tasks/{task_id}
