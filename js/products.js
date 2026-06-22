/* ============================================
   SOLANA — Product Catalog
   ============================================ */

const products = [
  // ===== SOL MINI (Mini Skirts) =====
  {
    id: 'sol-mini-terracotta',
    name: 'SOL MINI',
    category: 'skirt',
    categoryName: 'Mini Skirt',
    price: 49.00,
    description: 'A mini skirt that loves the sun as much as you do. High-waisted with a gentle A-line cut — short enough for a Madrid afternoon, polished enough for terrace drinks at sunset.',
    image: 'https://picsum.photos/seed/skirt-terracotta/600/800',
    color: 'Terracotta',
    colorHex: '#CC5533',
    badge: 'Best Seller',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: ['High-waist fit', 'A-line silhouette', 'Organic cotton blend', 'Side zipper']
  },
  {
    id: 'sol-mini-white',
    name: 'SOL MINI',
    category: 'skirt',
    categoryName: 'Mini Skirt',
    price: 49.00,
    description: 'Crisp, clean, and endlessly versatile. The white SOL MINI reflects the Madrid sun and pairs with literally everything in your closet.',
    image: 'https://picsum.photos/seed/skirt-white/600/800',
    color: 'Blanco',
    colorHex: '#F5F0EB',
    badge: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: ['High-waist fit', 'A-line silhouette', 'Organic cotton blend', 'Side zipper']
  },
  {
    id: 'sol-mini-sky',
    name: 'SOL MINI',
    category: 'skirt',
    categoryName: 'Mini Skirt',
    price: 49.00,
    description: 'The color of a cloudless Madrid sky at 2 PM. This baby blue mini brings a cool pop to the hottest days.',
    image: 'https://picsum.photos/seed/skirt-blue/600/800',
    color: 'Sky Blue',
    colorHex: '#87CEEB',
    badge: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: ['High-waist fit', 'A-line silhouette', 'Organic cotton blend', 'Side zipper']
  },
  {
    id: 'sol-mini-black',
    name: 'SOL MINI',
    category: 'skirt',
    categoryName: 'Mini Skirt',
    price: 49.00,
    description: 'Because every collection needs a black piece. Dress it up, dress it down — this one goes from day to night without blinking.',
    image: 'https://picsum.photos/seed/skirt-black/600/800',
    color: 'Negro',
    colorHex: '#1A1A1A',
    badge: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: ['High-waist fit', 'A-line silhouette', 'Organic cotton blend', 'Side zipper']
  },
  {
    id: 'sol-mini-coral',
    name: 'SOL MINI',
    category: 'skirt',
    categoryName: 'Mini Skirt',
    price: 49.00,
    description: 'Bold, juicy coral that turns heads on Gran Vía. The SOL MINI in its most extroverted form.',
    image: 'https://picsum.photos/seed/skirt-coral/600/800',
    color: 'Coral',
    colorHex: '#FF7F50',
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: ['High-waist fit', 'A-line silhouette', 'Organic cotton blend', 'Side zipper']
  },

  // ===== FLOW SHORT (Low-Waist Anti-Chafe Shorts) =====
  {
    id: 'flow-short-ivory',
    name: 'FLOW SHORT',
    category: 'shorts',
    categoryName: 'Low-Waist Short',
    price: 55.00,
    description: 'The short your thighs have been waiting for. Sits low on the waist with an ultra-soft inner panel that eliminates friction. Walk from Retiro to Malasaña without a second thought.',
    image: 'https://picsum.photos/seed/shorts-ivory/600/800',
    color: 'Ivory',
    colorHex: '#FFFFF0',
    badge: 'Anti-Chafe',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: ['Low-waist fit', 'Anti-chafe inner panel', 'Silky TENCEL™ blend', 'Relaxed leg opening', 'Elastic waistband']
  },
  {
    id: 'flow-short-olive',
    name: 'FLOW SHORT',
    category: 'shorts',
    categoryName: 'Low-Waist Short',
    price: 55.00,
    description: 'Earthy olive that feels grounded and cool. Same anti-chafe magic, in a shade that hides dust from summer adventures.',
    image: 'https://picsum.photos/seed/shorts-olive/600/800',
    color: 'Olive',
    colorHex: '#556B2F',
    badge: 'Anti-Chafe',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: ['Low-waist fit', 'Anti-chafe inner panel', 'Silky TENCEL™ blend', 'Relaxed leg opening', 'Elastic waistband']
  },
  {
    id: 'flow-short-sand',
    name: 'FLOW SHORT',
    category: 'shorts',
    categoryName: 'Low-Waist Short',
    price: 55.00,
    description: 'Warm sand beige — neutral enough for any top, interesting enough to stand alone. The ultimate everyday summer short.',
    image: 'https://picsum.photos/seed/shorts-sand/600/800',
    color: 'Sand',
    colorHex: '#C2B280',
    badge: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: ['Low-waist fit', 'Anti-chafe inner panel', 'Silky TENCEL™ blend', 'Relaxed leg opening', 'Elastic waistband']
  },

  // ===== OMBLIGO TOP (Belly-Button Length Top) =====
  {
    id: 'ombligo-top-cream',
    name: 'OMBLIGO TOP',
    category: 'top',
    categoryName: 'Belly-Button Top',
    price: 38.00,
    description: 'Cropped exactly at the navel — not too short, not too long. The OMBLIGO TOP frames your waist at the most flattering point. Made in a ribbed organic cotton that hugs without suffocating.',
    image: 'https://picsum.photos/seed/top-cream/600/800',
    color: 'Cream',
    colorHex: '#FFFDD0',
    badge: 'Essential',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: ['Navel-length crop', 'Ribbed organic cotton', 'Slim fit', 'Scoop neckline']
  },
  {
    id: 'ombligo-top-chocolate',
    name: 'OMBLIGO TOP',
    category: 'top',
    categoryName: 'Belly-Button Top',
    price: 38.00,
    description: 'Rich chocolate brown — warm, sophisticated, and unexpectedly versatile. Pairs beautifully with every SOL MINI color.',
    image: 'https://picsum.photos/seed/top-brown/600/800',
    color: 'Chocolate',
    colorHex: '#5C3317',
    badge: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: ['Navel-length crop', 'Ribbed organic cotton', 'Slim fit', 'Scoop neckline']
  },
  {
    id: 'ombligo-top-sunset',
    name: 'OMBLIGO TOP',
    category: 'top',
    categoryName: 'Belly-Button Top',
    price: 38.00,
    description: 'Inspired by the sky over Plaza de España at dusk. A gradient of pink and orange that makes every outfit feel like golden hour.',
    image: 'https://picsum.photos/seed/top-sunset/600/800',
    color: 'Sunset',
    colorHex: '#FF6F61',
    badge: 'Limited',
    sizes: ['XS', 'S', 'M', 'L'],
    features: ['Navel-length crop', 'Ribbed organic cotton', 'Slim fit', 'Scoop neckline']
  }
];

/**
 * Render a product card HTML
 */
function renderProductCard(product) {
  const badgeHtml = product.badge
    ? `<span class="product-badge">${product.badge}</span>`
    : '';

  return `
    <div class="product-card" data-category="${product.category}" data-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name} in ${product.color}" loading="lazy">
        ${badgeHtml}
      </div>
      <div class="product-body">
        <span class="category">${product.categoryName}</span>
        <h3>${product.name} — ${product.color}</h3>
        <div class="price">
          €${product.price.toFixed(2)}
        </div>
        <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">
          Add to Cart 🛒
        </button>
      </div>
    </div>
  `;
}

/**
 * Get a product by ID
 */
function getProductById(id) {
  return products.find(p => p.id === id);
}
