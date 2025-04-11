// app.js - Main server file
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Mock database for products
const products = [
  { id: 1, name: 'Smartphone', price: 499.99, description: 'Latest model smartphone with high-resolution camera', image: '/images/smartphone.jpg' },
  { id: 2, name: 'Laptop', price: 999.99, description: 'Powerful laptop for work and gaming', image: '/images/laptop.jpg' },
  { id: 3, name: 'Headphones', price: 149.99, description: 'Noise-cancelling wireless headphones', image: '/images/headphones.jpg' },
  { id: 4, name: 'Smartwatch', price: 199.99, description: 'Track your fitness and receive notifications', image: '/images/smartwatch.jpg' }
];

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// Serve HTML files for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});