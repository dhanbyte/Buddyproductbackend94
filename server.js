require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection with error handling
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Test endpoint
app.get('/api/test', async (req, res) => {
  try {
    const Product = require('./models/Product');
    const productCount = await Product.countDocuments();
    
    res.json({ 
      success: true,
      message: 'Backend server is running!', 
      timestamp: new Date().toISOString(),
      database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
      productsCount: productCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server test failed',
      details: error.message
    });
  }
});

const imagekitRouter = require('./routes/imagekit');
app.use('/api/imagekit', imagekitRouter);

const razorpayRouter = require('./routes/razorpay');
app.use('/api/razorpay', razorpayRouter);

const productsRouter = require('./routes/products');
app.use('/api/products', productsRouter);

// Add new routes for users and orders
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

const ordersRouter = require('./routes/orders');
app.use('/api/orders', ordersRouter);

// Auth routes for login, token refresh, etc.
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});