// ========================================
// GREENLY - API Configuration
// ========================================

const CONFIG = {
  // API Base URL - Update this based on environment
  API_BASE_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:8000/api'
    : 'https://your-production-domain.com/api',
  
  // API Endpoints
  ENDPOINTS: {
    // Authentication
    AUTH: {
      REGISTER: '/auth/register/',
      LOGIN: '/auth/login/',
      REFRESH: '/auth/refresh/',
      ME: '/auth/me/',
      LOGOUT: '/auth/logout/',
    },
    
    // Vendors
    VENDORS: {
      LIST: '/vendors/',
      DETAIL: (id) => `/vendors/${id}/`,
      CREATE: '/vendors/',
      UPDATE: (id) => `/vendors/${id}/`,
      STATUS: (id) => `/vendors/${id}/status/`,
      NEARBY: '/vendors/nearby/',
    },
    
    // Products
    PRODUCTS: {
      LIST: '/products/',
      DETAIL: (id) => `/products/${id}/`,
      CREATE: '/products/',
      UPDATE: (id) => `/products/${id}/`,
      DELETE: (id) => `/products/${id}/`,
      UPDATE_STOCK: (id) => `/products/${id}/stock/`,
    },
    
    // Orders
    ORDERS: {
      LIST: '/orders/',
      DETAIL: (id) => `/orders/${id}/`,
      CREATE: '/orders/',
      ACCEPT: (id) => `/orders/${id}/accept/`,
      COMPLETE: (id) => `/orders/${id}/complete/`,
      CANCEL: (id) => `/orders/${id}/cancel/`,
    },
    
    // Scrap Pickups
    PICKUPS: {
      LIST: '/pickups/',
      DETAIL: (id) => `/pickups/${id}/`,
      CREATE: '/pickups/',
      ACCEPT: (id) => `/pickups/${id}/accept/`,
      COMPLETE: (id) => `/pickups/${id}/complete/`,
    },
    
    // Collectors
    COLLECTORS: {
      LIST: '/collectors/',
      DETAIL: (id) => `/collectors/${id}/`,
      CREATE: '/collectors/',
      NEARBY: '/collectors/nearby/',
    },
  },
  
  // Local Storage Keys
  STORAGE_KEYS: {
    AUTH_TOKEN: 'greenly_auth_token',
    REFRESH_TOKEN: 'greenly_refresh_token',
    USER_DATA: 'greenly_user_data',
    CART: 'greenly_cart',
    LOCATION: 'greenly_location',
  },
  
  // App Settings
  SETTINGS: {
    DEFAULT_RADIUS: 5, // km
    MAX_CART_ITEMS: 50,
    IMAGE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    REQUEST_TIMEOUT: 30000, // 30 seconds
  },
  
  // Categories
  CATEGORIES: {
    PRODUCTS: [
      { value: 'fruit', label: 'Fruits' },
      { value: 'vegetable', label: 'Vegetables' },
      { value: 'leafy', label: 'Leafy Greens' },
      { value: 'herbs', label: 'Herbs & Spices' },
      { value: 'other', label: 'Other' },
    ],
    SCRAP: [
      { value: 'plastic', label: 'Plastic' },
      { value: 'paper', label: 'Paper' },
      { value: 'metal', label: 'Metal' },
      { value: 'glass', label: 'Glass' },
      { value: 'electronics', label: 'Electronics' },
      { value: 'other', label: 'Other' },
    ],
  },
  
  // Units
  UNITS: [
    { value: 'kg', label: 'Kilogram (kg)' },
    { value: 'g', label: 'Gram (g)' },
    { value: 'piece', label: 'Piece' },
    { value: 'dozen', label: 'Dozen' },
    { value: 'bunch', label: 'Bunch' },
  ],
  
  // Order Status
  ORDER_STATUS: {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    PREPARING: 'preparing',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
  },
  
  // User Roles
  ROLES: {
    CUSTOMER: 'customer',
    VENDOR: 'vendor',
    COLLECTOR: 'collector',
  },
};

// Freeze the config to prevent modifications
Object.freeze(CONFIG);
Object.freeze(CONFIG.ENDPOINTS);
Object.freeze(CONFIG.STORAGE_KEYS);
Object.freeze(CONFIG.SETTINGS);
Object.freeze(CONFIG.CATEGORIES);
Object.freeze(CONFIG.ORDER_STATUS);
Object.freeze(CONFIG.ROLES);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
