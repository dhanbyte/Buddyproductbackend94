const router = require('express').Router();
const User = require('../models/User');
const Order = require('../models/Order');
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

// Get all users (admin only)
router.route('/').get(verifyToken, isAdmin, (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get new users (logged in within last 24 hours) (admin only)
router.route('/new').get(verifyToken, isAdmin, (req, res) => {
  // Calculate date 24 hours ago
  const oneDayAgo = new Date();
  oneDayAgo.setHours(oneDayAgo.getHours() - 24);
  
  User.find({ lastLogin: { $gte: oneDayAgo } })
    .sort({ lastLogin: -1 }) // Sort by most recent login first
    .then(users => {
      // Add isNewUser flag
      const usersWithFlag = users.map(user => {
        const userObj = user.toObject();
        userObj.isNewUser = true;
        return userObj;
      });
      res.json(usersWithFlag);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new user (admin only)
router.route('/add').post(verifyToken, isAdmin, (req, res) => {
  const { name, email, phone, address } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !address) {
    return res.status(400).json('Error: All fields are required');
  }

  // Validate address fields
  if (!address.street || !address.city || !address.state || !address.pincode) {
    return res.status(400).json('Error: All address fields are required');
  }

  const newUser = new User({
    name,
    email,
    phone,
    address
  });

  newUser.save()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get user by ID (admin or owner)
router.route('/:id').get(verifyToken, (req, res) => {
  // Check if user is admin or the owner of the profile
  if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
    return res.status(403).json({ success: false, message: 'Unauthorized access to this profile' });
  }
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json('Error: User not found');
      }
      res.json(user);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update user by ID (admin or owner)
router.route('/update/:id').post(verifyToken, (req, res) => {
  // Check if user is admin or the owner of the profile
  if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
    return res.status(403).json({ success: false, message: 'Unauthorized access to this profile' });
  }
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json('Error: User not found');
      }

      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      
      if (req.body.address) {
        user.address.street = req.body.address.street || user.address.street;
        user.address.city = req.body.address.city || user.address.city;
        user.address.state = req.body.address.state || user.address.state;
        user.address.pincode = req.body.address.pincode || user.address.pincode;
        user.address.country = req.body.address.country || user.address.country;
      }

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;