# ☀️ CATANGIE — Summer Fashion E-Commerce

**Madrid · SS26**

SOLANA is a summer fashion brand born from Madrid's golden light. Three essential silhouettes, multiple colorways, one season. This is the full e-commerce storefront — built with vanilla HTML, CSS, and JavaScript.

---

## 🛍️ The Collection

| Piece | Colors | Price | Highlight |
|---|---|---|---|
| **SOL MINI** | Terracotta, Blanco, Sky Blue, Negro, Coral | €49 | High-waist A-line mini skirt |
| **FLOW SHORT** | Ivory, Olive, Sand | €55 | Low-waist short with anti-chafe inner panel |
| **OMBLIGO TOP** | Cream, Chocolate, Sunset | €38 | Cropped exactly at navel length |

---

## ✨ Features

- **🎨 Theme Customizer** — Switch between Bright, Dark, Pastel, and Ocean presets, or pick any custom accent color. Preferences persist via `localStorage`.
- **🛒 Shopping Cart** — Add to cart, adjust quantities, remove items. Cart survives page reloads.
- **💳 Checkout** — Credit card (with auto-formatting), PayPal (SDK integration), and Bizum.
- **📱 Fully Responsive** — Works on mobile, tablet, and desktop.
- **🏷️ Category Filters** — Filter the collection page by skirts, shorts, or tops.
- **✨ Scroll Animations** — Intersection Observer-powered fade-ups.

---

## 🚀 Quick Start

Just open `index.html` in any browser — no build step, no dependencies.

```
solana/
├── index.html          ← Homepage
├── products.html       ← Full collection + filters
├── cart.html           ← Shopping cart
├── checkout.html       ← Shipping, payment, order confirmation
├── css/
│   └── style.css       ← Theme system + all styles
├── js/
│   ├── products.js     ← Product catalog (11 SKUs)
│   ├── cart.js         ← Cart logic (localStorage)
│   └── main.js         ← Nav, theme customizer, checkout
└── img/                ← Product images (swap with your own)
```

---

## 🔧 Production To-Do

- Replace `client-id=test` in `checkout.html` with a real PayPal client ID
- Swap placeholder images (`picsum.photos`) for actual product photography
- Hook up a backend for real order processing (currently simulated)
- Add a custom domain

---

## 🧵 Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties for theming, CSS Grid + Flexbox, responsive breakpoints
- **Vanilla JavaScript** — No frameworks. `localStorage` for persistence, Intersection Observer for animations, PayPal SDK integration.

---

Made with ☀️ in Madrid.
