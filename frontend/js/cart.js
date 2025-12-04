// ========================================
// GREENLY - Shopping Cart
// LocalStorage-based cart management
// ========================================

/**
 * Get cart from localStorage
 */
function getCart() {
    const cartStr = localStorage.getItem(CONFIG.STORAGE_KEYS.CART);
    return cartStr ? JSON.parse(cartStr) : [];
}

/**
 * Save cart to localStorage
 */
function saveCart(cart) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.CART, JSON.stringify(cart));
    updateCartUI();
}

/**
 * Add item to cart
 */
function addToCart(product, quantity = 1) {
    const cart = getCart();

    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.productId === product.id);

    if (existingItemIndex > -1) {
        // Update quantity
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item
        cart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            unit: product.unit,
            image: product.image,
            vendorId: product.vendor_id || product.vendorId,
            vendorName: product.vendor_name || product.vendorName,
            quantity: quantity,
            addedAt: new Date().toISOString(),
        });
    }

    // Check max items limit
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (totalItems > CONFIG.SETTINGS.MAX_CART_ITEMS) {
        showToast('Cart is full! Maximum 50 items allowed.', 'error');
        return false;
    }

    saveCart(cart);
    showToast(`${product.name} added to cart!`, 'success');
    return true;
}

/**
 * Remove item from cart
 */
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.productId !== productId);
    saveCart(cart);
    showToast('Item removed from cart', 'info');
}

/**
 * Update item quantity
 */
function updateCartItemQuantity(productId, quantity) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            cart[itemIndex].quantity = quantity;
            saveCart(cart);
        }
    }
}

/**
 * Clear entire cart
 */
function clearCart() {
    localStorage.removeItem(CONFIG.STORAGE_KEYS.CART);
    updateCartUI();
    showToast('Cart cleared', 'info');
}

/**
 * Get cart total
 */
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Get cart item count
 */
function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Group cart items by vendor
 */
function getCartByVendor() {
    const cart = getCart();
    const grouped = {};

    cart.forEach(item => {
        const vendorId = item.vendorId;
        if (!grouped[vendorId]) {
            grouped[vendorId] = {
                vendorId: vendorId,
                vendorName: item.vendorName,
                items: [],
                total: 0,
            };
        }

        grouped[vendorId].items.push(item);
        grouped[vendorId].total += item.price * item.quantity;
    });

    return Object.values(grouped);
}

/**
 * Check if product is in cart
 */
function isInCart(productId) {
    const cart = getCart();
    return cart.some(item => item.productId === productId);
}

/**
 * Get product quantity in cart
 */
function getCartItemQuantity(productId) {
    const cart = getCart();
    const item = cart.find(item => item.productId === productId);
    return item ? item.quantity : 0;
}

/**
 * Update cart UI (badge count)
 */
function updateCartUI() {
    const count = getCartItemCount();
    const cartBadges = document.querySelectorAll('.cart-count');

    cartBadges.forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-flex' : 'none';
    });

    // Dispatch custom event for cart update
    window.dispatchEvent(new CustomEvent('cartUpdated', {
        detail: { count, total: getCartTotal() }
    }));
}

/**
 * Render cart items
 */
function renderCartItems(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const cart = getCart();

    if (cart.length === 0) {
        container.innerHTML = `
      <div class="empty-cart">
        <div style="font-size: 4rem; margin-bottom: 16px;">🛒</div>
        <h3>Your cart is empty</h3>
        <p style="color: var(--text-medium); margin-bottom: 24px;">
          Add some fresh products to get started!
        </p>
        <a href="/pages/products.html" class="btn btn-primary">
          Browse Products
        </a>
      </div>
    `;
        return;
    }

    const groupedCart = getCartByVendor();

    let html = '';
    groupedCart.forEach(vendor => {
        html += `
      <div class="cart-vendor-group">
        <h3 class="cart-vendor-name">🏪 ${vendor.vendorName}</h3>
        <div class="cart-items">
    `;

        vendor.items.forEach(item => {
            html += `
        <div class="cart-item" data-product-id="${item.productId}">
          <img src="${item.image || '/assets/images/placeholder.jpg'}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.name}</h4>
            <p class="cart-item-price">${formatCurrency(item.price)} / ${item.unit}</p>
          </div>
          <div class="cart-item-quantity">
            <button class="btn-quantity" onclick="updateCartItemQuantity('${item.productId}', ${item.quantity - 1})">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="btn-quantity" onclick="updateCartItemQuantity('${item.productId}', ${item.quantity + 1})">+</button>
          </div>
          <div class="cart-item-subtotal">
            ${formatCurrency(item.price * item.quantity)}
          </div>
          <button class="btn-remove" onclick="removeFromCart('${item.productId}')" title="Remove">
            ✕
          </button>
        </div>
      `;
        });

        html += `
        </div>
        <div class="cart-vendor-total">
          Vendor Total: <strong>${formatCurrency(vendor.total)}</strong>
        </div>
      </div>
    `;
    });

    container.innerHTML = html;
}

/**
 * Render cart summary
 */
function renderCartSummary(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const cart = getCart();
    const total = getCartTotal();
    const itemCount = getCartItemCount();

    // Calculate delivery fee (example: ₹20 per vendor)
    const vendorCount = new Set(cart.map(item => item.vendorId)).size;
    const deliveryFee = vendorCount * 20;
    const grandTotal = total + deliveryFee;

    container.innerHTML = `
    <div class="cart-summary">
      <h3>Order Summary</h3>
      <div class="summary-row">
        <span>Items (${itemCount})</span>
        <span>${formatCurrency(total)}</span>
      </div>
      <div class="summary-row">
        <span>Delivery Fee</span>
        <span>${formatCurrency(deliveryFee)}</span>
      </div>
      <div class="summary-row summary-total">
        <span>Total</span>
        <span>${formatCurrency(grandTotal)}</span>
      </div>
      <button class="btn btn-primary btn-block btn-lg" onclick="window.location.href='/pages/checkout.html'">
        Proceed to Checkout
      </button>
    </div>
  `;
}

// Initialize cart UI on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getCart,
        saveCart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
        getCartByVendor,
        isInCart,
        getCartItemQuantity,
        updateCartUI,
        renderCartItems,
        renderCartSummary,
    };
}
