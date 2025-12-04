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

## 📝 Common Tasks

### Add a Vendor
1. Start backend server
2. Go to http://localhost:8000/admin/
3. Login with superuser
4. Click "Users" → "Add User"
5. Create user with role="vendor"
6. Click "Vendors" → "Add Vendor"
7. Fill in shop details

### Add Products
1. Go to admin panel
2. Click "Products" → "Add Product"
3. Select vendor
4. Fill in product details
5. Upload image
6. Save

### View Database
- Admin panel: http://localhost:8000/admin/
- All models visible and editable

## 🌐 URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:8080 | Customer-facing website |
| Backend Admin | http://localhost:8000/admin/ | Django admin panel |
| Backend API | http://localhost:8000/api/ | REST API (coming soon) |

## 🐛 Troubleshooting

### "Cannot find path backend"
**Solution:** You're in the wrong directory
```bash
# From "New folder" directory:
cd greenly\backend
```

### "python is not recognized"
**Solution:** Python not in PATH or not installed
```bash
# Check Python installation:
python --version
```

### "No module named django"
**Solution:** Virtual environment not activated
```bash
cd greenly\backend
.\venv\Scripts\activate
```

### Port already in use
**Solution:** Change port number
```bash
# Frontend
python -m http.server 8081

# Backend
python manage.py runserver 8001
```

## 📊 Current Status

✅ **Frontend:** Complete with home page, design system, cart, location services
✅ **Backend:** Core models, admin panel, database ready
⏳ **API Endpoints:** Next step
⏳ **Frontend Pages:** Products, cart, checkout pages
⏳ **Integration:** Connect frontend to backend

## 🎯 Next Steps

1. **Test Backend:**
   ```bash
   cd greenly\backend
   .\venv\Scripts\activate
   python manage.py createsuperuser
   python manage.py runserver
   ```

2. **Add Sample Data:**
   - Use admin panel to add vendors
   - Add products with images
   - Create test orders

3. **Build API Endpoints:**
   - Create serializers
   - Create API views
   - Configure URLs

4. **Build Frontend Pages:**
   - Products listing
   - Product detail
   - Cart page
   - Checkout

5. **Integrate:**
   - Connect frontend to API
   - Test complete user flows

---

**Need Help?** Check the documentation in the artifacts folder!
