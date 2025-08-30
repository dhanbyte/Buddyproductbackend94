const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js');
const NodeCache = require('node-cache');

// In-memory cache with 5 minute TTL (Time To Live)
const productCache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

// Middleware to check cache
const checkCache = (req, res, next) => {
  const cacheKey = req.originalUrl || req.url;
  const cachedData = productCache.get(cacheKey);
  
  if (cachedData) {
    console.log(`Cache hit for ${cacheKey}`);
    return res.json(cachedData);
  }
  
  console.log(`Cache miss for ${cacheKey}`);
  next();
};

// Middleware to validate product data
const validateProduct = (req, res, next) => {
  const { name, price, category, quantity } = req.body;
  
  if (!name || !price || !category || !quantity) {
    return res.status(400).json({ 
      error: 'Missing required fields', 
      required: ['name', 'price', 'category', 'quantity'] 
    });
  }
  
  next();
};

// Get all products with optional filtering
router.route('/').get(checkCache, async (req, res) => {
  try {
    const { category, q, minPrice, maxPrice, inStock, sort, limit = 20, page = 1 } = req.query;
    const query = {};
    
    // Apply filters if provided
    if (category) query.category = category;
    if (inStock === 'true') query['inventory.inStock'] = true;
    
    // Price range filter
    if (minPrice || maxPrice) {
      query['price.discounted'] = {};
      if (minPrice) query['price.discounted'].$gte = Number(minPrice);
      if (maxPrice) query['price.discounted'].$lte = Number(maxPrice);
    }
    
    // Search by name or description
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $regex: q, $options: 'i' } }
      ];
    }
    
    // Determine sort order
    let sortOption = { 'lastUpdated': -1 }; // Default sort by newest
    if (sort === 'price-asc') sortOption = { 'price.discounted': 1 };
    if (sort === 'price-desc') sortOption = { 'price.discounted': -1 };
    if (sort === 'name-asc') sortOption = { name: 1 };
    if (sort === 'name-desc') sortOption = { name: -1 };
    
    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    // Execute query with pagination
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .select('-__v -_id') // Exclude version field and MongoDB _id
      .lean(); // Convert to plain JavaScript objects
    
    // Get total count for pagination info
    const total = await Product.countDocuments(query);
    
    const result = {
      success: true,
      data: {
        products,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / Number(limit))
        }
      }
    };
    
    // Cache the result
    productCache.set(req.originalUrl || req.url, result);
    
    res.json(result);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
});

// Get product by ID or slug
router.route('/:idOrSlug').get(checkCache, async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    
    // Try to find by ID first, then by slug
    let product = await Product.findOne({ id: idOrSlug }).select('-__v -_id').lean();
    
    if (!product) {
      product = await Product.findOne({ slug: idOrSlug }).select('-__v -_id').lean();
    }
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        error: 'Product not found' 
      });
    }
    
    const result = {
      success: true,
      data: product
    };
    
    // Cache the result
    productCache.set(req.originalUrl || req.url, result);
    
    res.json(result);
  } catch (err) {
    console.error(`Error fetching product ${req.params.idOrSlug}:`, err);
    res.status(500).json({ error: 'Failed to fetch product', details: err.message });
  }
});

// Add new product
router.route('/add').post(validateProduct, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    
    // Generate unique ID if not provided
    if (!newProduct.id) {
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      newProduct.id = `PROD-${timestamp}${random}`;
    }
    
    const savedProduct = await newProduct.save();
    
    // Clear cache for products list
    productCache.del('/products');
    
    res.status(201).json({
      message: 'Product added successfully',
      product: savedProduct
    });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(400).json({ error: 'Failed to add product', details: err.message });
  }
});

// Update product
router.route('/:id').put(validateProduct, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find and update the product
    const updatedProduct = await Product.findOneAndUpdate(
      { id },
      { ...req.body, lastUpdated: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Clear related caches
    productCache.del(`/products/${id}`);
    productCache.del('/products');
    
    res.json({
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (err) {
    console.error(`Error updating product ${req.params.id}:`, err);
    res.status(400).json({ error: 'Failed to update product', details: err.message });
  }
});

// Delete product
router.route('/:id').delete(async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedProduct = await Product.findOneAndDelete({ id });
    
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Clear related caches
    productCache.del(`/products/${id}`);
    productCache.del('/products');
    
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(`Error deleting product ${req.params.id}:`, err);
    res.status(500).json({ error: 'Failed to delete product', details: err.message });
  }
});

module.exports = router;
