/* ============================================
   SOLANA — Shopping Cart
   Uses localStorage to persist cart across pages
   ============================================ */

const CART_KEY = 'solana_cart';

/**
 * Get the full cart from localStorage
 */
function getCart() {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Save cart to localStorage
 */
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/**
 * Add a product to the cart (or increase quantity if already there)
 */
function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.productId === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  saveCart(cart);
  updateCartCount();
  showToast('Added to cart! 🛒');
}

/**
 * Remove an item from the cart
 */
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.productId !== productId);
  saveCart(cart);
  updateCartCount();
}

/**
 * Update quantity of an item in cart
 */
function updateCartQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find(item => item.productId === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
    saveCart(cart);
    updateCartCount();
  }
}

/**
 * Get total number of items in cart
 */
function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Get cart subtotal
 */
function getCartSubtotal() {
  return getCart().reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
}

/**
 * Get cart with full product details
 */
function getCartWithDetails() {
  return getCart().map(item => {
    const product = getProductById(item.productId);
    return { ...item, product };
  }).filter(item => item.product); // filter out any that no longer exist
}

/**
 * Clear the entire cart
 */
function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
}

/**
 * Update the cart count badge in the nav
 */
function updateCartCount() {
  const count = getCartCount();
  document.querySelectorAll('#cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

/**
 * Render the cart page
 */
function renderCartPage() {
  const container = document.getElementById('cart-container');
  if (!container) return;

  const cart = getCartWithDetails();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <span class="icon">🛒</span>
        <h2>Your cart is empty</h2>
        <p>The sun is waiting — find your perfect summer piece.</p>
        <a href="products.html" class="btn btn-primary">Browse Collection</a>
      </div>
    `;
    return;
  }

  const subtotal = getCartSubtotal();
  const shipping = subtotal >= 80 ? 0 : 5.90;
  const total = subtotal + shipping;

  container.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">
        ${cart.map(item => `
          <div class="cart-item" data-product-id="${item.productId}">
            <div class="cart-item-image">
              <img src="${item.product.image}" alt="${item.product.name}">
            </div>
            <div class="cart-item-info">
              <h3>${item.product.name}</h3>
              <p class="variant">${item.product.color} · ${item.product.categoryName}</p>
              <p class="price">€${(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
            <div class="cart-item-qty">
              <button onclick="updateCartQuantity('${item.productId}', ${item.quantity - 1}); renderCartPage();">−</button>
              <span>${item.quantity}</span>
              <button onclick="updateCartQuantity('${item.productId}', ${item.quantity + 1}); renderCartPage();">+</button>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.productId}'); renderCartPage();">
              ✕ Remove
            </button>
          </div>
        `).join('')}
      </div>
      <div class="cart-summary">
        <h2>Order Summary</h2>
        <div class="summary-row">
          <span>Subtotal</span>
          <span>€${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
          <span>Shipping</span>
          <span>${shipping === 0 ? '<strong style="color:var(--color-success)">Free</strong>' : '€' + shipping.toFixed(2)}</span>
        </div>
        ${shipping > 0 ? `<div class="summary-row" style="font-size:0.8rem; color:var(--color-text-light);">
          <span></span><span>Free shipping over €80</span>
        </div>` : ''}
        <div class="summary-row total">
          <span>Total</span>
          <span>€${total.toFixed(2)}</span>
        </div>
        <a href="checkout.html" class="btn btn-primary">Proceed to Checkout →</a>
        <button class="btn btn-outline" style="width:100%; margin-top:8px;" onclick="clearCart(); renderCartPage();">
          Clear Cart
        </button>
      </div>
    </div>
  `;
}

/**
 * Render the checkout order summary
 */
function renderCheckoutSummary() {
  const orderItems = document.getElementById('order-items');
  if (!orderItems) return;

  const cart = getCartWithDetails();
  const subtotal = getCartSubtotal();
  const shipping = subtotal >= 80 ? 0 : 5.90;
  const total = subtotal + shipping;

  // Redirect if cart is empty
  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  orderItems.innerHTML = cart.map(item => `
    <div class="order-item">
      <div class="order-item-image">
        <img src="${item.product.image}" alt="${item.product.name}">
      </div>
      <div class="order-item-info">
        <h4>${item.product.name} — ${item.product.color}</h4>
        <span>Qty: ${item.quantity}</span>
      </div>
      <div class="order-item-price">€${(item.product.price * item.quantity).toFixed(2)}</div>
    </div>
  `).join('');

  document.getElementById('summary-subtotal').textContent = `€${subtotal.toFixed(2)}`;
  document.getElementById('summary-shipping').textContent = shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`;
  document.getElementById('summary-total').textContent = `€${total.toFixed(2)}`;
  document.getElementById('checkout-total').textContent = `€${total.toFixed(2)}`;
}

/**
 * Initialize cart-related event listeners
 */
function initCartListeners() {
  // Add to cart buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart-btn');
    if (btn) {
      const productId = btn.dataset.id;
      addToCart(productId);
      // Brief button feedback
      btn.textContent = 'Added! ✓';
      btn.style.background = 'var(--color-success)';
      setTimeout(() => {
        btn.textContent = 'Add to Cart 🛒';
        btn.style.background = '';
      }, 1500);
    }
  });
}
