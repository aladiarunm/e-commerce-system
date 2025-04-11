let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

// Navigation function
function navigateTo(page, id = null) {
  const app = document.getElementById('app');
  
  switch(page) {
    case 'home':
      loadHomePage();
      break;
    case 'products':
      loadProductsPage();
      break;
    case 'product':
      loadProductPage(id);
      break;
    case 'cart':
      loadCartPage();
      break;
    case 'about':
      loadAboutPage();
      break;
    case 'contact':
      loadContactPage();
      break;
    default:
      loadHomePage();
  }
}

// Load Home Page
async function loadHomePage() {
  const response = await fetch('/api/products');
  const products = await response.json();
  
  const app = document.getElementById('app');
  
  let html = `
    <section class="hero">
      <div class="hero-content">
        <h2>Welcome to ShopIt</h2>
        <p>Find the best electronics at competitive prices</p>
        <a href="#" onclick="navigateTo('products')" class="btn">Shop Now</a>
      </div>
    </section>
    
    <section id="featured-products" class="products-section">
      <h2>Featured Products</h2>
      <div class="products-grid">
  `;
  
  products.forEach(product => {
    html += `
      <div class="product-card">
        <div class="product-img">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <p>${product.description}</p>
          <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;
  });
  
  html += `
      </div>
    </section>
  `;
  
  app.innerHTML = html;
}

// Load Products Page
async function loadProductsPage() {
  const response = await fetch('/api/products');
  const products = await response.json();
  
  const app = document.getElementById('app');
  
  let html = `
    <h2>All Products</h2>
    <div class="products-grid">
  `;
  
  products.forEach(product => {
    html += `
      <div class="product-card">
        <div class="product-img">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3><a href="#" onclick="navigateTo('product', ${product.id})">${product.name}</a></h3>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <p>${product.description}</p>
          <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;
  });
  
  html += `
    </div>
  `;
  
  app.innerHTML = html;
}

// Load Single Product Page
async function loadProductPage(id) {
  const response = await fetch(`/api/products/${id}`);
  const product = await response.json();
  
  const app = document.getElementById('app');
  
  const html = `
    <div class="product-detail">
      <div class="product-detail-img">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-detail-info">
        <h2>${product.name}</h2>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
        <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    </div>
  `;
  
  app.innerHTML = html;
}

// Load Cart Page
async function loadCartPage() {
  const response = await fetch('/api/products');
  const products = await response.json();
  
  const app = document.getElementById('app');
  
  if (cart.length === 0) {
    app.innerHTML = `
      <h2>Your Cart</h2>
      <p>Your cart is empty. <a href="#" onclick="navigateTo('products')">Continue shopping</a></p>
    `;
    return;
  }
  
  let html = `
    <h2>Your Cart</h2>
    <div class="cart-items">
  `;
  
  let total = 0;
  
  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      
      html += `
        <div class="cart-item">
          <div class="cart-item-img">
            <img src="${product.image}" alt="${product.name}" width="50">
          </div>
          <div class="cart-item-info">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
          </div>
          <div class="cart-item-quantity">
            <button onclick="updateQuantity(${product.id}, ${item.quantity - 1})">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${product.id}, ${item.quantity + 1})">+</button>
          </div>
          <div class="cart-item-total">
            $${itemTotal.toFixed(2)}
          </div>
        </div>
      `;
    }
  });
  
  html += `
    </div>
    <div class="cart-total">
      <h3>Total: $${total.toFixed(2)}</h3>
      <button class="checkout-btn" onclick="checkout()">Proceed to Checkout</button>
    </div>
  `;
  
  app.innerHTML = html;
}

// Load About Page
function loadAboutPage() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <h2>About Us</h2>
    <p>ShopIt is your trusted online store for electronics and accessories. We offer competitive prices and excellent customer service.</p>
    <p>Founded in 2020, our mission is to provide high-quality products to customers worldwide.</p>
  `;
}

// Load Contact Page
function loadContactPage() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <h2>Contact Us</h2>
    <p>If you have any questions or concerns, please feel free to contact us:</p>
    <p>Email: info@shopIt.com</p>
    <p>Phone: (123) 456-7890</p>
    <p>Address: 123 E-Commerce St, Tech City, TC 12345</p>
    <form id="contact-form">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" required>
      </div>
      <div>
        <label for="message">Message:</label>
        <textarea id="message" required></textarea>
      </div>
      <button type="submit">Send Message</button>
    </form>
  `;
  
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
  });
}

// Add to Cart Function
function addToCart(productId) {
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  
  // Save cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  
  alert('Product added to cart!');
}

// Update Cart Quantity
function updateQuantity(productId, quantity) {
  if (quantity <= 0) {
    cart = cart.filter(item => item.id !== productId);
  } else {
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }
  
  // Save cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  loadCartPage();
}

// Update Cart Count
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = count;
}

// Checkout Function
function checkout() {
  alert('Thank you for your order!');
  cart = [];
  localStorage.removeItem('cart');
  updateCartCount();
  navigateTo('home');
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  navigateTo('home');
});