// ========================================
// GREENLY - Utility Functions
// ========================================

/**
 * Format currency
 */
function formatCurrency(amount) {
    return `₹${parseFloat(amount).toFixed(2)}`;
}

/**
 * Format date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-IN', options);
}

/**
 * Format time
 */
function formatTime(dateString) {
    const date = new Date(dateString);
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString('en-IN', options);
}

/**
 * Format date and time
 */
function formatDateTime(dateString) {
    return `${formatDate(dateString)} at ${formatTime(dateString)}`;
}

/**
 * Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Add styles
    toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background-color: ${type === 'success' ? '#27AE60' : type === 'error' ? '#E74C3C' : '#3498DB'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
    font-weight: 500;
  `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Show loading spinner
 */
function showLoading(element) {
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.id = 'loadingSpinner';
    element.appendChild(spinner);
}

/**
 * Hide loading spinner
 */
function hideLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.remove();
    }
}

/**
 * Validate email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number (Indian format)
 */
function isValidPhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

/**
 * Sanitize HTML to prevent XSS
 */
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

/**
 * Get query parameters from URL
 */
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
        result[key] = value;
    }
    return result;
}

/**
 * Set query parameter in URL
 */
function setQueryParam(key, value) {
    const url = new URL(window.location);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url);
}

/**
 * Format file size
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Validate image file
 */
function validateImage(file) {
    const maxSize = CONFIG.SETTINGS.IMAGE_MAX_SIZE;
    const allowedTypes = CONFIG.SETTINGS.ALLOWED_IMAGE_TYPES;

    if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Please upload JPG, PNG, or WebP images.');
    }

    if (file.size > maxSize) {
        throw new Error(`File size must be less than ${formatFileSize(maxSize)}`);
    }

    return true;
}

/**
 * Create image preview
 */
function createImagePreview(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => callback(e.target.result);
    reader.readAsDataURL(file);
}

/**
 * Copy to clipboard
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('Copied to clipboard!', 'success');
    } catch (error) {
        showToast('Failed to copy', 'error');
    }
}

/**
 * Generate random ID
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Capitalize first letter
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate text
 */
function truncate(str, length = 100) {
    if (str.length <= length) return str;
    return str.substr(0, length) + '...';
}

/**
 * Check if user is logged in
 */
function isLoggedIn() {
    return !!localStorage.getItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
}

/**
 * Get current user data
 */
function getCurrentUser() {
    const userData = localStorage.getItem(CONFIG.STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
}

/**
 * Logout user
 */
function logout() {
    localStorage.removeItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(CONFIG.STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(CONFIG.STORAGE_KEYS.USER_DATA);
    window.location.href = '/pages/login.html';
}

/**
 * Require authentication
 */
function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = '/pages/login.html';
        return false;
    }
    return true;
}

/**
 * Check user role
 */
function hasRole(role) {
    const user = getCurrentUser();
    return user && user.role === role;
}

/**
 * Add CSS animation keyframes
 */
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatCurrency,
        formatDate,
        formatTime,
        formatDateTime,
        debounce,
        throttle,
        showToast,
        showLoading,
        hideLoading,
        isValidEmail,
        isValidPhone,
        sanitizeHTML,
        getQueryParams,
        setQueryParam,
        formatFileSize,
        validateImage,
        createImagePreview,
        copyToClipboard,
        generateId,
        capitalize,
        truncate,
        isLoggedIn,
        getCurrentUser,
        logout,
        requireAuth,
        hasRole,
    };
}
