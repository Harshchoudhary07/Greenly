#  Greenly - Hyperlocal Vendor Marketplace

A community-driven hyperlocal marketplace connecting customers with local fruit/vegetable vendors, scrap dealers, and plastic collectors.

##  Project Overview

Greenly empowers roadside vendors by providing them with a digital presence while connecting customers with fresh, chemical-free produce from their neighborhood. The platform promotes sustainability, fair pricing, and community empowerment.

##  Features

### For Customers
-  Find vendors near you using geolocation
-  Browse fresh fruits, vegetables, and more
-  View freshness indicators and vendor ratings
-  Easy checkout and order tracking
-  Request scrap pickup services

### For Vendors
-  Create digital storefront
- Manage products and inventory
- Simple, vendor-friendly dashboard
-  Accept and manage orders
-  Build customer trust through ratings

### For Scrap Collectors
-  List services and pricing
-  Get nearby pickup requests
- Manage pickups efficiently

##  Technology Stack

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

##  Project Structure

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


   ```

