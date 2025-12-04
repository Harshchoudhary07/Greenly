// ========================================
// GREENLY - API Client
// Fetch wrapper with JWT authentication
// ========================================

class APIClient {
    constructor() {
        this.baseURL = CONFIG.API_BASE_URL;
        this.timeout = CONFIG.SETTINGS.REQUEST_TIMEOUT;
    }

    /**
     * Get authentication token from localStorage
     */
    getToken() {
        return localStorage.getItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
    }

    /**
     * Set authentication token in localStorage
     */
    setToken(token) {
        localStorage.setItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN, token);
    }

    /**
     * Remove authentication token
     */
    removeToken() {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.USER_DATA);
    }

    /**
     * Build headers for API requests
     */
    getHeaders(isFormData = false) {
        const headers = {};

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    /**
     * Handle API response
     */
    async handleResponse(response) {
        const contentType = response.headers.get('content-type');
        const isJSON = contentType && contentType.includes('application/json');

        const data = isJSON ? await response.json() : await response.text();

        if (!response.ok) {
            // Handle specific error codes
            if (response.status === 401) {
                // Unauthorized - token expired or invalid
                this.removeToken();
                window.location.href = '/pages/login.html';
                throw new Error('Session expired. Please login again.');
            }

            if (response.status === 403) {
                throw new Error('You do not have permission to perform this action.');
            }

            if (response.status === 404) {
                throw new Error('Resource not found.');
            }

            if (response.status === 500) {
                throw new Error('Server error. Please try again later.');
            }

            // Extract error message from response
            const errorMessage = data.detail || data.message || data.error || 'An error occurred';
            throw new Error(errorMessage);
        }

        return data;
    }

    /**
     * Make API request with timeout
     */
    async requestWithTimeout(url, options) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error('Request timeout. Please check your connection.');
            }
            throw error;
        }
    }

    /**
     * GET request
     */
    async get(endpoint, params = {}) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const url = `${this.baseURL}${endpoint}${queryString ? '?' + queryString : ''}`;

            const response = await this.requestWithTimeout(url, {
                method: 'GET',
                headers: this.getHeaders(),
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    }

    /**
     * POST request
     */
    async post(endpoint, data = {}, isFormData = false) {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const body = isFormData ? data : JSON.stringify(data);

            const response = await this.requestWithTimeout(url, {
                method: 'POST',
                headers: this.getHeaders(isFormData),
                body: body,
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('POST request failed:', error);
            throw error;
        }
    }

    /**
     * PUT request
     */
    async put(endpoint, data = {}, isFormData = false) {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const body = isFormData ? data : JSON.stringify(data);

            const response = await this.requestWithTimeout(url, {
                method: 'PUT',
                headers: this.getHeaders(isFormData),
                body: body,
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('PUT request failed:', error);
            throw error;
        }
    }

    /**
     * PATCH request
     */
    async patch(endpoint, data = {}) {
        try {
            const url = `${this.baseURL}${endpoint}`;

            const response = await this.requestWithTimeout(url, {
                method: 'PATCH',
                headers: this.getHeaders(),
                body: JSON.stringify(data),
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('PATCH request failed:', error);
            throw error;
        }
    }

    /**
     * DELETE request
     */
    async delete(endpoint) {
        try {
            const url = `${this.baseURL}${endpoint}`;

            const response = await this.requestWithTimeout(url, {
                method: 'DELETE',
                headers: this.getHeaders(),
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('DELETE request failed:', error);
            throw error;
        }
    }

    /**
     * Upload file
     */
    async uploadFile(endpoint, file, additionalData = {}) {
        try {
            const formData = new FormData();
            formData.append('file', file);

            // Add additional form data
            Object.keys(additionalData).forEach(key => {
                formData.append(key, additionalData[key]);
            });

            return await this.post(endpoint, formData, true);
        } catch (error) {
            console.error('File upload failed:', error);
            throw error;
        }
    }
}

// Create singleton instance
const api = new APIClient();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
}
