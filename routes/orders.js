const router = require('express').Router();
const Order = require('../models/Order');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'shopweve-secret-key';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  // Get token from authorization header or cookie
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const cookieToken = req.cookies?.accessToken;
  
  const accessToken = token || cookieToken;
  
  if (!accessToken) return res.status(401).json({ success: false, message: 'Access token required' });
  
  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// Admin middleware
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
};

// Get all orders (admin only)
router.route('/').get(verifyToken, isAdmin, (req, res) => {
  Order.find()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get all orders with detailed information for admin panel (admin only)
router.route('/admin').get(verifyToken, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    
    // Format orders for admin panel with additional information
    const formattedOrders = orders.map(order => {
      return {
        _id: order._id,
        orderId: order._id,
        userName: order.address?.fullName || 'Unknown',
        userPhone: order.phone || 'Unknown',
        total: order.total,
        status: order.status,
        orderDate: order.createdAt,
        itemCount: order.items?.length || 0,
        items: order.items,
        address: order.address,
        paymentMethod: order.paymentMethod,
        paymentId: order.paymentId
      };
    });
    
    res.json(formattedOrders);
  } catch (err) {
    res.status(400).json('Error: ' + err.message);
  }
});

// Add a new order (requires authentication)
router.route('/add').post(verifyToken, async (req, res) => {
  try {
    const { userId, items, total, address, phone, paymentMethod, paymentId } = req.body;

    // Validate required fields
    if (!items || !items.length || !total || !address || !phone || !paymentMethod) {
      return res.status(400).json('Error: All fields are required');
    }

    // Check if user exists, if not create a new user
    let user;
    if (userId) {
      user = await User.findById(userId);
    }

    if (!user && req.body.userDetails) {
      // Create a new user if user details are provided
      const { name, email } = req.body.userDetails;
      if (!name || !email) {
        return res.status(400).json('Error: User name and email are required');
      }

      const newUser = new User({
        name,
        email,
        phone,
        address
      });

      user = await newUser.save();
    }

    if (!user) {
      return res.status(400).json('Error: User not found and user details not provided');
    }

    const newOrder = new Order({
      userId: user._id,
      items,
      total,
      address,
      phone,
      paymentMethod,
      paymentId,
      status: 'pending'
    });

    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (err) {
    res.status(400).json('Error: ' + err.message);
  }
});

// Get order by ID (admin or order owner)
router.route('/:id').get(verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    // Check if user is admin or the owner of the order
    if (req.user.role !== 'admin' && req.user.id !== order.userId.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized access to this order' });
    }
    
    res.json(order);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Get orders by user ID (admin or order owner)
router.route('/user/:userId').get(verifyToken, (req, res) => {
  // Check if user is admin or the owner of the orders
  if (req.user.role !== 'admin' && req.user.id !== req.params.userId) {
    return res.status(403).json({ success: false, message: 'Unauthorized access to these orders' });
  }
  Order.find({ userId: req.params.userId })
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update order status (admin only)
router.route('/:orderId/status').put(verifyToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }
    
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }
    
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    order.status = status;
    await order.save();
    
    return res.json({ success: true, message: 'Order status updated successfully' });
  } catch (err) {
    console.error('Error updating order status:', err);
    return res.status(500).json({ success: false, message: 'Server error updating order status' });
  }
});

// Get order details by ID (admin only)
router.route('/details/:orderId').get(verifyToken, isAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    // Get user details if available
    let userDetails = null;
    if (order.userId) {
      userDetails = await User.findById(order.userId).select('name phoneNumber email');
    }
    
    const orderDetails = {
      _id: order._id,
      orderId: order._id,
      items: order.items,
      total: order.total,
      status: order.status,
      orderDate: order.createdAt,
      address: order.address,
      paymentMethod: order.paymentMethod,
      paymentId: order.paymentId,
      user: userDetails
    };
    
    return res.json({ success: true, order: orderDetails });
  } catch (err) {
    console.error('Error fetching order details:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching order details' });
  }
});

module.exports = router;