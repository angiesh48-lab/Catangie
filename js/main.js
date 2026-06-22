/* ============================================
   SOLANA — Main JavaScript
   Handles: navigation, theme customization,
   product rendering, checkout, toast notifications
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNavLink();
  initThemeSystem();
  updateCartCount();
  initCartListeners();
  initScrollAnimations();

  // Page-specific initializations
  renderFeaturedProducts();
  renderAllProducts();
  renderCartPage();
  renderCheckoutSummary();
  initCheckout();
  initProductFilters();
});

/* ============================================
   MOBILE NAVIGATION
   ============================================ */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('active');
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('active');
    });
  });
}

/* ============================================
   ACTIVE NAV LINK
   ============================================ */
function initActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.product-card, .feature-card, .animate-on-scroll')
    .forEach(el => observer.observe(el));
}

/* ============================================
   RENDER FEATURED PRODUCTS (Homepage)
   ============================================ */
function renderFeaturedProducts() {
  const grid = document.getElementById('featured-products');
  if (!grid) return;

  // Show one of each category on the homepage
  const featured = [
    products.find(p => p.id === 'sol-mini-terracotta'),
    products.find(p => p.id === 'flow-short-ivory'),
    products.find(p => p.id === 'ombligo-top-sunset')
  ].filter(Boolean);

  grid.innerHTML = featured.map(p => renderProductCard(p)).join('');
}

/* ============================================
   RENDER ALL PRODUCTS (Collection Page)
   ============================================ */
function renderAllProducts() {
  const grid = document.getElementById('all-products');
  if (!grid) return;

  grid.innerHTML = products.map(p => renderProductCard(p)).join('');
}

/* ============================================
   PRODUCT FILTERS (Collection Page)
   ============================================ */
function initProductFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const cards = document.querySelectorAll('#all-products .product-card');

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ============================================
   TOAST NOTIFICATIONS
   ============================================ */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

/* ============================================
   THEME SYSTEM
   ============================================ */
function initThemeSystem() {
  const toggleBtn = document.getElementById('theme-toggle');
  const panel = document.getElementById('theme-panel');
  const accentPicker = document.getElementById('accent-picker');

  if (!toggleBtn || !panel) return;

  // Load saved theme
  const savedTheme = localStorage.getItem('solana_theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  }

  // Load saved accent
  const savedAccent = localStorage.getItem('solana_accent');
  if (savedAccent && accentPicker) {
    accentPicker.value = savedAccent;
    applyAccent(savedAccent);
  }

  // Toggle panel
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('open');
  });

  // Close panel on outside click
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== toggleBtn) {
      panel.classList.remove('open');
    }
  });

  // Preset buttons
  panel.querySelectorAll('.theme-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
      localStorage.setItem('solana_theme', theme);

      // Update active state
      panel.querySelectorAll('.theme-preset').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update accent picker to match
      if (accentPicker && theme === 'bright') accentPicker.value = '#FF6B35';
      if (accentPicker && theme === 'dark') accentPicker.value = '#FF8C5A';
      if (accentPicker && theme === 'pastel') accentPicker.value = '#E8789A';
      if (accentPicker && theme === 'ocean') accentPicker.value = '#0EA5E9';
    });
  });

  // Custom accent color
  if (accentPicker) {
    accentPicker.addEventListener('input', () => {
      const color = accentPicker.value;
      applyAccent(color);
      localStorage.setItem('solana_accent', color);

      // Deselect presets when using custom
      panel.querySelectorAll('.theme-preset').forEach(b => b.classList.remove('active'));
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('solana_theme');
    });
  }

  // Set initial active preset
  updateActivePreset();
}

function applyTheme(theme) {
  if (theme === 'bright') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

function applyAccent(color) {
  document.documentElement.style.setProperty('--color-accent', color);
  // Darken for hover
  document.documentElement.style.setProperty('--color-accent-hover', adjustColor(color, -20));
  // Lighten for soft bg
  document.documentElement.style.setProperty('--color-accent-soft', color + '25');
}

function updateActivePreset() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'bright';
  document.querySelectorAll('.theme-preset').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === currentTheme);
  });
}

/**
 * Simple color darkening (for hover state)
 */
function adjustColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
  return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/* ============================================
   CHECKOUT LOGIC
   ============================================ */
function initCheckout() {
  const paymentMethods = document.getElementById('payment-methods');
  const placeOrderBtn = document.getElementById('place-order');
  const cardForm = document.getElementById('card-form');
  const paypalSection = document.getElementById('paypal-section');
  const bizumSection = document.getElementById('bizum-section');

  if (!paymentMethods || !placeOrderBtn) return;

  let selectedMethod = 'card';

  // Payment method switching
  paymentMethods.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', () => {
      paymentMethods.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
      method.classList.add('selected');
      selectedMethod = method.dataset.method;

      // Toggle forms
      if (cardForm) cardForm.style.display = selectedMethod === 'card' ? '' : 'none';
      if (paypalSection) paypalSection.style.display = selectedMethod === 'paypal' ? '' : 'none';
      if (bizumSection) bizumSection.style.display = selectedMethod === 'bizum' ? '' : 'none';
    });
  });

  // Place order handler
  placeOrderBtn.addEventListener('click', () => {
    if (!validateCheckout(selectedMethod)) return;

    // Simulate order processing
    placeOrderBtn.textContent = 'Processing...';
    placeOrderBtn.disabled = true;

    setTimeout(() => {
      const orderNum = 'SOL-' + Date.now().toString(36).toUpperCase().slice(-6);
      document.getElementById('order-number').textContent = orderNum;

      const successOverlay = document.getElementById('order-success');
      if (successOverlay) {
        successOverlay.style.display = 'flex';
      }

      // Clear cart after successful order
      clearCart();

      placeOrderBtn.textContent = 'Place Order';
      placeOrderBtn.disabled = false;
    }, 1500);
  });
}

function validateCheckout(method) {
  const firstName = document.getElementById('first-name')?.value.trim();
  const lastName = document.getElementById('last-name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const address = document.getElementById('address')?.value.trim();
  const city = document.getElementById('city')?.value.trim();
  const postal = document.getElementById('postal')?.value.trim();

  if (!firstName || !lastName || !email || !address || !city || !postal) {
    showToast('Please fill in all shipping fields 📦');
    return false;
  }

  if (!isValidEmail(email)) {
    showToast('Please enter a valid email address ✉️');
    return false;
  }

  if (method === 'card') {
    const cardName = document.getElementById('card-name')?.value.trim();
    const cardNumber = document.getElementById('card-number')?.value.trim();
    const cardExpiry = document.getElementById('card-expiry')?.value.trim();
    const cardCvc = document.getElementById('card-cvc')?.value.trim();

    if (!cardName || !cardNumber || !cardExpiry || !cardCvc) {
      showToast('Please fill in all card details 💳');
      return false;
    }

    if (cardNumber.replace(/\s/g, '').length < 13) {
      showToast('Please enter a valid card number 💳');
      return false;
    }
  }

  if (method === 'bizum') {
    const bizumPhone = document.getElementById('bizum-phone')?.value.trim();
    if (!bizumPhone) {
      showToast('Please enter your Bizum phone number 📱');
      return false;
    }
  }

  return true;
}

/* ============================================
   PAYPAL BUTTON RENDERING
   ============================================ */
function renderPayPalButton() {
  const container = document.getElementById('paypal-button-container');
  if (!container || typeof paypal_sdk === 'undefined') return;

  const total = getCartSubtotal();
  const shipping = total >= 80 ? 0 : 5.90;

  paypal_sdk.Buttons({
    style: {
      layout: 'vertical',
      color: 'gold',
      shape: 'pill',
      label: 'paypal'
    },
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: (total + shipping).toFixed(2),
            currency_code: 'EUR'
          },
          description: 'SOLANA Summer Collection'
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        const orderNum = 'SOL-' + Date.now().toString(36).toUpperCase().slice(-6);
        document.getElementById('order-number').textContent = orderNum;
        const successOverlay = document.getElementById('order-success');
        if (successOverlay) successOverlay.style.display = 'flex';
        clearCart();
      });
    },
    onError: function(err) {
      showToast('Payment failed. Please try again.');
      console.error('PayPal error:', err);
    }
  }).render('#paypal-button-container');
}

/* ============================================
   CARD NUMBER FORMATTING
   ============================================ */
document.addEventListener('input', (e) => {
  // Auto-format card number
  if (e.target.id === 'card-number') {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = value.substring(0, 19);
  }

  // Auto-format expiry
  if (e.target.id === 'card-expiry') {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value.substring(0, 5);
  }

  // CVC - digits only
  if (e.target.id === 'card-cvc') {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
  }
});

/* ============================================
   HELPER
   ============================================ */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ============================================
   INITIALIZE PAYPAL ON LOAD
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Delay PayPal init to ensure SDK is loaded
  setTimeout(() => {
    if (document.getElementById('paypal-button-container')) {
      renderPayPalButton();
    }
  }, 1000);
});
