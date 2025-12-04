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

10. **Access API**
    - API: http://localhost:8000/api/
    - Admin: http://localhost:8000/admin/
    - Swagger Docs: http://localhost:8000/swagger/

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

## 🔧 Configuration

### Database (SQLite for Development)
The project uses SQLite by default for easy setup. For production, switch to PostgreSQL.

### CORS Settings
CORS is configured to allow requests from:
- http://localhost:8080 (development)
- Your production frontend URL

### JWT Authentication
- Access token expiry: 60 minutes
- Refresh token expiry: 7 days

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login and get JWT token
- `POST /api/auth/refresh/` - Refresh access token
- `GET /api/auth/me/` - Get current user profile

### Vendor Endpoints
- `GET /api/vendors/` - List all vendors
- `GET /api/vendors/nearby/?lat=12.97&lng=77.59&radius=5` - Get nearby vendors
- `POST /api/vendors/` - Create vendor profile
- `GET /api/vendors/{id}/` - Get vendor details
- `PUT /api/vendors/{id}/` - Update vendor
- `PATCH /api/vendors/{id}/status/` - Toggle active status

### Product Endpoints
- `GET /api/products/` - List all products
- `GET /api/products/?category=fruit` - Filter by category
- `GET /api/products/?vendor={id}` - Filter by vendor
- `POST /api/products/` - Create product (vendor only)
- `GET /api/products/{id}/` - Get product details
- `PUT /api/products/{id}/` - Update product
- `PATCH /api/products/{id}/stock/` - Update stock
- `DELETE /api/products/{id}/` - Delete product

### Order Endpoints
- `POST /api/orders/` - Create order
- `GET /api/orders/` - List orders (filtered by user role)
- `GET /api/orders/{id}/` - Get order details
- `PATCH /api/orders/{id}/accept/` - Vendor accepts order
- `PATCH /api/orders/{id}/complete/` - Mark as delivered
- `PATCH /api/orders/{id}/cancel/` - Cancel order

## 🧪 Testing

```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test users
python manage.py test products

# Check code coverage
coverage run --source='.' manage.py test
coverage report
```

## 🐛 Troubleshooting

### Issue: Module not found
**Solution:** Make sure virtual environment is activated and dependencies are installed.

### Issue: Database errors
**Solution:** Run migrations: `python manage.py migrate`

### Issue: CORS errors
**Solution:** Check CORS_ALLOWED_ORIGINS in settings.py

### Issue: Image upload fails
**Solution:** Ensure MEDIA_ROOT and MEDIA_URL are configured correctly.

## 📚 Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [JWT Authentication](https://django-rest-framework-simplejwt.readthedocs.io/)

---

**Next Steps:** After backend setup, integrate with frontend and test all API endpoints!
