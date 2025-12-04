# Greenly Backend Setup Guide

## 🚀 Quick Start

### Prerequisites
- Python 3.9 or higher
- pip (Python package manager)
- PostgreSQL (optional - we'll use SQLite for development)

### Installation Steps

1. **Create Virtual Environment**
   ```bash
   cd backend
   python -m venv venv
   ```

2. **Activate Virtual Environment**
   ```bash
   # Windows
   venv\Scripts\activate
   
   # Mac/Linux
   source venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create Django Project**
   ```bash
   django-admin startproject greenly_backend .
   ```

5. **Create Django Apps**
   ```bash
   python manage.py startapp users
   python manage.py startapp vendors
   python manage.py startapp products
   python manage.py startapp orders
   python manage.py startapp collectors
   ```

6. **Run Migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

7. **Create Superuser**
   ```bash
   python manage.py createsuperuser
   ```

8. **Load Sample Data**
   ```bash
   python manage.py load_sample_data
   ```

9. **Run Development Server**
   ```bash
   python manage.py runserver
   ```



## 📁 Project Structure

```
backend/
├── greenly_backend/          # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── users/                    # User management
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── vendors/                  # Vendor management
├── products/                 # Product management
├── orders/                   # Order management
├── collectors/               # Scrap collector management
├── media/                    # Uploaded images
├── manage.py
└── requirements.txt
```

