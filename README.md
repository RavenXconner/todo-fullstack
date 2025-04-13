backend/README.md
# 🧠 FastAPI Backend – Full-Stack To-Do List App

This is the FastAPI backend for the full-stack To-Do List application. It provides a RESTful API with full CRUD operations, task filtering, and integration with a PostgreSQL database.

## 🚀 Getting Started

### 🔧 Setup Instructions

1. **Clone this repo and enter the backend folder**
   
cd backend

Create a virtual environment and activate it
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

Install dependencies

 
  
  
pip install -r requirements.txt
Create a .env file with your database URL

php-template
  
  
DATABASE_URL=postgresql://<user>:<password>@<host>/<dbname>
Run the app

 
  
  
uvicorn main:app --reload
Access your API docs

Swagger: http://localhost:8000/docs

Redoc: http://localhost:8000/redoc

📐 API Endpoints
Base URL: https://todo-fullstack-wvsi.onrender.com/api/todos/

Method	Endpoint	Description
GET	/	Get all todos
GET	/{id}	Get single todo by ID
POST	/	Create a new todo
PUT	/{id}	Update a todo
DELETE	/{id}	Delete a todo
GET	/filter/{status}	Filter todos by status
Request/Response formats are included in the main README.md.

📦 Project Structure
pgsql
  
  
backend/
├── main.py
├── models.py
├── schemas.py
├── crud.py
├── database.py
├── config.py
└── .env
⚙️ Deployment
This app is deployed on Render.

Make sure to:

Add environment variables on Render

Use a render.yaml file if needed

🛡️ CORS Configuration
If calling this API from React frontend, make sure you’ve enabled CORS:

python
  
  
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
🧑‍💻 Author
Javy Rodillon

yaml
  
  

---

### 📁 `frontend/README.md`
  markdown
# 🌐 React Frontend – Full-Stack To-Do List App

This is the React frontend of the To-Do List web app built with Vite and Tailwind CSS. It interacts with the FastAPI backend to manage tasks.

## 🚀 Getting Started

### 🔧 Setup Instructions

1. **Navigate to the frontend folder**
   
cd frontend
Install dependencies

 
  
  
npm install
Run the dev server

 
  
  
npm run dev
App runs at: http://localhost:5173

🧠 Features
✅ Create, Read, Update, Delete tasks

🗂️ Filter tasks by: All / Completed / Pending

🌗 Toggle between Dark and Light Mode

⚡ Full integration with FastAPI backend

🖥️ Responsive UI with Tailwind CSS

⚙️ API Connection
All API requests are sent to:

js
  
  
const API_BASE_URL = 'https://your-backend.onrender.com/api/todos/';
Make sure this matches your deployed backend.

🌓 Dark Mode
Dark mode is handled via a toggle button. Preferences are stored in local storage.

🔐 Optional Auth Integration
If backend token auth is enabled, attach the token in headers:

js
  
  
headers: {
  Authorization: `Token ${userToken}`,
}
🧑‍💻 Author
Javy Rodillon

yaml
  
  

---

## 📄 `ToDoApp_Report.md`

Here's the **draft** in Markdown. I’ll generate a downloadable PDF next.

  markdown
# 📊 Project Report – Full-Stack To-Do List App

## 👨‍💻 Developer: Javy Rodillon

---

## ✅ Project Overview

This project demonstrates a full-stack web application built with **React** (frontend) and **FastAPI** (backend), providing a responsive and functional To-Do List manager.

---

## ⚙️ Tech Stack

| Layer     | Technology     |
|-----------|----------------|
| Frontend  | React, Vite, Tailwind |
| Backend   | FastAPI, SQLAlchemy, PostgreSQL |
| Hosting   | Netlify (frontend), Render (backend) |

---

## 🧪 Key Features

- Create, Read, Update, Delete To-Do items
- Filter tasks: All / Completed / Pending
- Dark/Light mode toggle
- FastAPI Swagger UI integration
- Deployed live frontend and backend

---

## 🆚 FastAPI vs Django REST Framework (DRF)

| Feature              | Django REST Framework | FastAPI                    |
|----------------------|-----------------------|----------------------------|
| Performance          | Synchronous, slower   | Asynchronous, fast         |
| Documentation        | Manual or Spectacular | Auto Swagger + Redoc       |
| Syntax               | Class-based           | Function-based, modern     |
| Learning Curve       | Higher                | Easier                     |
| Community Support    | Mature, large         | Newer, growing rapidly     |

**Why FastAPI?**  
For this app, FastAPI provided quick development, automatic documentation, async performance, and ease of use — perfect for this type of CRUD-focused API.

---

## 🔧 Challenges & Solutions

| Challenge                          | Solution                                           |
|-----------------------------------|----------------------------------------------------|
| React → FastAPI CORS errors       | Added CORS middleware in FastAPI                  |
| API response delays on Render     | Optimized DB queries and added loading indicators |
| Styling toggle dark/light mode    | Used Tailwind + localStorage for persistence      |
| SQLite limits on deployment       | Switched to PostgreSQL for Render compatibility   |

---

## 🌐 Deployment

| Component | Platform | URL                                  |
|-----------|----------|--------------------------------------|
| Frontend  | Netlify  | `https://your-frontend.netlify.app`  |
| Backend   | Render   | `https://your-backend.onrender.com`  |

---

## 📁 GitHub Repositories

- [Frontend Repo](https://github.com/your-username/fullstack-todo-frontend)
- [Backend Repo](https://github.com/your-username/fullstack-todo-backend)

---

## 🎯 Learnings

- Improved async handling and REST API integration
- Practical deployment experience on Render and Netlify
- Better understanding of how to build maintainable modular code