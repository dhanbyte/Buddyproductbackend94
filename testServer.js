const mongoose = require('mongoose');
require('dotenv').config();

// Test MongoDB connection
async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('✅ MongoDB connection successful');
    
    // Test if Product model works
    const Product = require('./models/Product');
    const productCount = await Product.countDocuments();
    console.log(`📦 Products in database: ${productCount}`);
    
    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();
