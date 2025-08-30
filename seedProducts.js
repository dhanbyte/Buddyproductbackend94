const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Product = require('./models/Product');

const sampleProducts = [
  {
    id: 'tech001',
    name: 'Wireless Bluetooth Earbuds',
    slug: 'wireless-bluetooth-earbuds',
    brand: 'TechSound',
    category: 'Tech',
    subcategory: 'Audio',
    price: {
      original: 4999,
      discounted: 3499,
      currency: 'INR'
    },
    quantity: 50,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=400&auto=format&fit=crop',
    description: 'Premium wireless earbuds with active noise cancellation and 24-hour battery life',
    shortDescription: 'Premium wireless earbuds with ANC',
    features: ['Bluetooth 5.2', '24hr battery life', 'Active noise cancellation', 'IPX4 water resistant'],
    tags: ['wireless', 'audio', 'earbuds', 'bluetooth'],
    sku: 'TS-WE001',
    inventory: {
      inStock: true,
      lowStockThreshold: 5
    },
    codAvailable: true,
    ratings: {
      average: 4.5,
      count: 128
    }
  },
  {
    id: 'tech002',
    name: 'Smart Fitness Watch',
    slug: 'smart-fitness-watch',
    brand: 'FitTech',
    category: 'Tech',
    subcategory: 'Wearables',
    price: {
      original: 12999,
      discounted: 9999,
      currency: 'INR'
    },
    quantity: 25,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop',
    description: 'Advanced smartwatch with health monitoring, GPS tracking, and 7-day battery life',
    shortDescription: 'Advanced smartwatch with health monitoring',
    features: ['Heart rate monitor', 'GPS tracking', '7-day battery', 'Sleep tracking', 'Water resistant'],
    tags: ['smartwatch', 'fitness', 'health', 'gps'],
    sku: 'FT-SW002',
    inventory: {
      inStock: true,
      lowStockThreshold: 3
    },
    codAvailable: true,
    ratings: {
      average: 4.3,
      count: 89
    }
  },
  {
    id: 'home001',
    name: 'Smart LED Bulb Set',
    slug: 'smart-led-bulb-set',
    brand: 'BrightHome',
    category: 'Home',
    subcategory: 'Lighting',
    price: {
      original: 2999,
      discounted: 2299,
      currency: 'INR'
    },
    quantity: 100,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop',
    description: 'Set of 4 smart LED bulbs with app control, voice control, and 16 million colors',
    shortDescription: 'Smart LED bulbs with app control',
    features: ['App control', 'Voice control', '16 million colors', 'Energy efficient', 'Dimmable'],
    tags: ['smart', 'led', 'lighting', 'home automation'],
    sku: 'BH-LED001',
    inventory: {
      inStock: true,
      lowStockThreshold: 10
    },
    codAvailable: true,
    ratings: {
      average: 4.2,
      count: 156
    }
  },
  {
    id: 'ayur001',
    name: 'Organic Ashwagandha Capsules',
    slug: 'organic-ashwagandha-capsules',
    brand: 'AyurVeda Plus',
    category: 'Ayurvedic',
    subcategory: 'Supplements',
    price: {
      original: 1299,
      discounted: 999,
      currency: 'INR'
    },
    quantity: 200,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop',
    description: 'Pure organic Ashwagandha capsules for stress relief and energy boost. 60 capsules per bottle.',
    shortDescription: 'Organic Ashwagandha for stress relief',
    features: ['100% organic', 'Stress relief', 'Energy boost', '60 capsules', 'No side effects'],
    tags: ['ayurvedic', 'organic', 'ashwagandha', 'stress relief', 'natural'],
    sku: 'AVP-ASH001',
    inventory: {
      inStock: true,
      lowStockThreshold: 20
    },
    codAvailable: true,
    ratings: {
      average: 4.6,
      count: 234
    }
  },
  {
    id: 'home002',
    name: 'Bamboo Kitchen Organizer Set',
    slug: 'bamboo-kitchen-organizer-set',
    brand: 'EcoHome',
    category: 'Home',
    subcategory: 'Kitchen',
    price: {
      original: 3499,
      discounted: 2799,
      currency: 'INR'
    },
    quantity: 40,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=400&auto=format&fit=crop',
    description: 'Eco-friendly bamboo kitchen organizer set with multiple compartments for utensils and spices',
    shortDescription: 'Eco-friendly bamboo kitchen organizer',
    features: ['100% bamboo', 'Multiple compartments', 'Eco-friendly', 'Easy to clean', 'Durable'],
    tags: ['bamboo', 'kitchen', 'organizer', 'eco-friendly', 'storage'],
    sku: 'EH-BKO002',
    inventory: {
      inStock: true,
      lowStockThreshold: 5
    },
    codAvailable: true,
    ratings: {
      average: 4.4,
      count: 67
    }
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    
    // Add sample products
    await Product.insertMany(sampleProducts);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
