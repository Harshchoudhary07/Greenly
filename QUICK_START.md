# Greenly - Quick Reference Guide

## 📂 Project Structure
```
New folder/
└── greenly/                    ← Main project folder
    ├── frontend/               ← HTML/CSS/JS files
    │   ├── index.html
    │   ├── css/
    │   ├── js/
    │   └── pages/
    └── backend/                ← Django backend
        ├── venv/               ← Virtual environment
        ├── manage.py
        ├── greenly_backend/
        ├── users/
        ├── vendors/
        ├── products/
        ├── orders/
        └── collectors/
```

## 🚀 Quick Start Commands

### Frontend (from `New folder` directory)
```bash
cd greenly\frontend
python -m http.server 8080
```
**Access:** http://localhost:8080

### Backend (from `New folder` directory)
```bash
cd greenly\backend
.\venv\Scripts\activate
python manage.py runserver
```
**Access:** http://localhost:8000

## 🔧 Backend Commands

### Navigate to Backend
```bash
cd greenly\backend
```

### Activate Virtual Environment
```bash
.\venv\Scripts\activate
```

### Create Superuser (First Time Only)
```bash
python manage.py createsuperuser
# Enter username, email, password
```

### Run Development Server
```bash
python manage.py runserver
```

### Access Admin Panel
```
http://localhost:8000/admin/
```

### Run Migrations (if you make model changes)
```bash
python manage.py makemigrations
python manage.py migrate
```

### Deactivate Virtual Environment
```bash
deactivate
```
