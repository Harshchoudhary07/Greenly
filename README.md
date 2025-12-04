# 🌿 Greenly - Hyperlocal Vendor Marketplace

A community-driven hyperlocal marketplace connecting customers with local fruit/vegetable vendors, scrap dealers, and plastic collectors.

## 🎯 Project Overview

Greenly empowers roadside vendors by providing them with a digital presence while connecting customers with fresh, chemical-free produce from their neighborhood. The platform promotes sustainability, fair pricing, and community empowerment.

## ✨ Features

### For Customers
- 📍 Find vendors near you using geolocation
- 🛒 Browse fresh fruits, vegetables, and more
- 🌱 View freshness indicators and vendor ratings
- 💳 Easy checkout and order tracking
- ♻️ Request scrap pickup services

### For Vendors
- 🏪 Create digital storefront
- 📦 Manage products and inventory
- 📱 Simple, vendor-friendly dashboard
- 💰 Accept and manage orders
- ⭐ Build customer trust through ratings

### For Scrap Collectors
- 📋 List services and pricing
- 📍 Get nearby pickup requests
- 🚛 Manage pickups efficiently

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid
- **Vanilla JavaScript** - ES6+
- **PWA** - Progressive Web App capabilities

### Backend
- **Django 4.x** - Web framework
- **Django REST Framework** - API
- **PostgreSQL** - Database with PostGIS
- **JWT** - Authentication

## 📁 Project Structure

```
greenly/
├── frontend/                  # Static frontend files
│   ├── index.html            # Home page
│   ├── css/
│   │   ├── variables.css     # Design system
│   │   ├── base.css          # Base styles
│   │   ├── components.css    # UI components
│   │   └── pages/            # Page-specific styles
│   ├── js/
│   │   ├── config.js         # API configuration
│   │   ├── api.js            # API client
│   │   ├── auth.js           # Authentication
│   │   ├── cart.js           # Shopping cart
│   │   ├── location.js       # Geolocation
│   │   └── utils.js          # Utilities
│   ├── pages/                # HTML pages
│   └── assets/               # Images, icons
│
└── backend/                   # Django project (to be created)
    ├── manage.py
    ├── greenly/              # Django settings
    ├── api/                  # Main API app
    ├── users/                # User management
    ├── vendors/              # Vendor app
    ├── products/             # Products app
    ├── orders/               # Orders app
    └── collectors/           # Scrap collectors app
```

## 🎨 Design System

### Color Palette
- **Primary Green**: `#2ECC71` - Fresh, natural
- **Secondary Yellow**: `#F4C542` - Warm, inviting
- **Accent Brown**: `#8D6E63` - Earth tones
- **Background**: `#FAFAFA` - Clean, light

### Typography
- **Primary Font**: Inter
- **Secondary Font**: Poppins
- **Large Buttons**: 56px+ height (vendor-friendly)

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- PostgreSQL with PostGIS
- Node.js (optional, for development tools)

### Frontend Setup

1. **Clone the repository**
   ```bash
   cd greenly/frontend
   ```

2. **Open with a local server**
   ```bash
   # Using Python
   python -m http.server 8080
   
   # Using Node.js
   npx serve
   ```

3. **Access the application**
   ```
   http://localhost:8080
   ```

### Backend Setup (Coming Soon)

1. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up database**
   ```bash
   python manage.py migrate
   ```

4. **Run development server**
   ```bash
   python manage.py runserver
   ```

## 📝 Configuration

Update `frontend/js/config.js` with your API endpoint:

```javascript
const CONFIG = {
  API_BASE_URL: 'http://localhost:8000/api',
  // ... other settings
};
```

## 🔑 Key Features Implemented

### ✅ Phase 1: Foundation (Current)
- [x] Project structure
- [x] Design system with green/nature theme
- [x] Home page with hero section
- [x] Navigation component
- [x] API client setup
- [x] Shopping cart functionality
- [x] Location services
- [x] Utility functions

### 🔄 Phase 2: Backend (In Progress)
- [ ] Django project setup
- [ ] Database models
- [ ] REST API endpoints
- [ ] JWT authentication
- [ ] Image upload handling

### 📋 Phase 3: Customer Pages (Planned)
- [ ] Product listing
- [ ] Product details
- [ ] Cart page
- [ ] Checkout flow
- [ ] Order tracking

### 🏪 Phase 4: Vendor Dashboard (Planned)
- [ ] Vendor registration
- [ ] Dashboard with large buttons
- [ ] Add/edit products
- [ ] Order management
- [ ] Inventory tracking

### ♻️ Phase 5: Scrap Module (Planned)
- [ ] Collector registration
- [ ] Pickup requests
- [ ] Service area management

## 🌐 API Endpoints (Planned)

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - Login
- `GET /api/auth/me/` - Get current user

### Products
- `GET /api/products/` - List products
- `GET /api/products/{id}/` - Product details
- `POST /api/products/` - Create product (vendor)

### Orders
- `POST /api/orders/` - Create order
- `GET /api/orders/` - List orders
- `PATCH /api/orders/{id}/accept/` - Accept order (vendor)

### Vendors
- `GET /api/vendors/nearby/` - Find nearby vendors
- `POST /api/vendors/` - Create vendor profile

## 🤝 Contributing

This is a community-driven project. Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Built with 💚 for local communities.

## 📞 Contact

- Email: support@greenly.com
- Phone: +91 98765 43210

## 🙏 Acknowledgments

- Local vendors who inspired this project
- Community members supporting sustainable practices
- Open source contributors

---

**Made with 🌿 by the Greenly Team**
