# Greenly Backend - Setup Script
# Run this to set up the Django backend

Write-Host " Setting up Greenly Backend..." -ForegroundColor Green

# Create virtual environment
Write-Host "`n Creating virtual environment..." -ForegroundColor Cyan
python -m venv venv

# Activate virtual environment
Write-Host "`n Activating virtual environment..." -ForegroundColor Cyan
.\venv\Scripts\Activate.ps1

# Install dependencies
Write-Host "`n📥 Installing dependencies..." -ForegroundColor Cyan
pip install --upgrade pip
pip install -r requirements.txt

# Create Django project
Write-Host "`n Creating Django project..." -ForegroundColor Cyan
django-admin startproject greenly_backend .

# Create Django apps
Write-Host "`n Creating Django apps..." -ForegroundColor Cyan
python manage.py startapp users
python manage.py startapp vendors
python manage.py startapp products
python manage.py startapp orders
python manage.py startapp collectors

Write-Host "`n Setup complete! Next steps:" -ForegroundColor Green
Write-Host "1. Configure settings.py"
Write-Host "2. Create models"
Write-Host "3. Run migrations"
Write-Host "4. Create superuser"
Write-Host "5. Load sample data"
