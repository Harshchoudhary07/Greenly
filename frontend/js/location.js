// ========================================
// GREENLY - Location Services
// Geolocation and distance calculations
// ========================================

/**
 * Get user's current location
 */
function getLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                };

                // Save to localStorage
                localStorage.setItem(CONFIG.STORAGE_KEYS.LOCATION, JSON.stringify(location));

                resolve(location);
            },
            (error) => {
                let errorMessage = 'Unable to get your location';

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location permission denied. Please enable location access.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out.';
                        break;
                }

                reject(new Error(errorMessage));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000, // 5 minutes
            }
        );
    });
}

/**
 * Get saved location from localStorage
 */
function getSavedLocation() {
    const locationStr = localStorage.getItem(CONFIG.STORAGE_KEYS.LOCATION);
    return locationStr ? JSON.parse(locationStr) : null;
}

/**
 * Calculate distance between two points using Haversine formula
 * Returns distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Format distance for display
 */
function formatDistance(km) {
    if (km < 1) {
        return `${Math.round(km * 1000)}m`;
    }
    return `${km.toFixed(1)}km`;
}

/**
 * Get vendors nearby
 */
async function getVendorsNearby(lat, lng, radius = CONFIG.SETTINGS.DEFAULT_RADIUS) {
    try {
        const response = await api.get(CONFIG.ENDPOINTS.VENDORS.NEARBY, {
            lat,
            lng,
            radius,
        });

        return response;
    } catch (error) {
        console.error('Failed to get nearby vendors:', error);
        throw error;
    }
}

/**
 * Get collectors nearby
 */
async function getCollectorsNearby(lat, lng, radius = CONFIG.SETTINGS.DEFAULT_RADIUS) {
    try {
        const response = await api.get(CONFIG.ENDPOINTS.COLLECTORS.NEARBY, {
            lat,
            lng,
            radius,
        });

        return response;
    } catch (error) {
        console.error('Failed to get nearby collectors:', error);
        throw error;
    }
}

/**
 * Request location permission
 */
async function requestLocationPermission() {
    try {
        const location = await getLocation();
        showToast('Location access granted!', 'success');
        return location;
    } catch (error) {
        showToast(error.message, 'error');
        throw error;
    }
}

/**
 * Check if location permission is granted
 */
async function checkLocationPermission() {
    if (!navigator.permissions) {
        return 'prompt';
    }

    try {
        const result = await navigator.permissions.query({ name: 'geolocation' });
        return result.state; // 'granted', 'denied', or 'prompt'
    } catch (error) {
        return 'prompt';
    }
}

/**
 * Show location permission modal
 */
function showLocationPermissionModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3 class="modal-title">📍 Enable Location</h3>
      </div>
      <div class="modal-body">
        <p>Greenly needs your location to:</p>
        <ul style="margin: 16px 0; padding-left: 20px;">
          <li>Find vendors near you</li>
          <li>Show accurate delivery distances</li>
          <li>Provide better service</li>
        </ul>
        <p style="color: var(--text-medium); font-size: 14px;">
          Your location is only used to connect you with nearby vendors and is not shared with anyone.
        </p>
      </div>
      <div class="modal-footer" style="display: flex; gap: 12px; margin-top: 24px;">
        <button class="btn btn-outline btn-block" onclick="this.closest('.modal-overlay').remove()">
          Maybe Later
        </button>
        <button class="btn btn-primary btn-block" id="enableLocationBtn">
          Enable Location
        </button>
      </div>
    </div>
  `;

    document.body.appendChild(modal);

    document.getElementById('enableLocationBtn').addEventListener('click', async () => {
        try {
            await requestLocationPermission();
            modal.remove();
        } catch (error) {
            // Error already shown by requestLocationPermission
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

/**
 * Initialize location services
 */
async function initLocation() {
    const permission = await checkLocationPermission();

    if (permission === 'granted') {
        try {
            await getLocation();
        } catch (error) {
            console.error('Failed to get location:', error);
        }
    } else if (permission === 'prompt') {
        // Show modal after a delay to not overwhelm user
        setTimeout(() => {
            showLocationPermissionModal();
        }, 2000);
    }
}

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getLocation,
        getSavedLocation,
        calculateDistance,
        formatDistance,
        getVendorsNearby,
        getCollectorsNearby,
        requestLocationPermission,
        checkLocationPermission,
        showLocationPermissionModal,
        initLocation,
    };
}
