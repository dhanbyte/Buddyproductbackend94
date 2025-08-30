const router = require('express').Router();
const User = require('../models/User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'shopweve-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'shopweve-refresh-secret-key';
const ACCESS_TOKEN_EXPIRY = '1h';
const REFRESH_TOKEN_EXPIRY = '30d';

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

// Login or register user
router.route('/login').post(async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    const { phoneNumber, name } = req.body;
    
    if (!phoneNumber) {
      console.log('Login failed: Phone number missing');
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }
    
    // Find user by phone number
    console.log('Searching for user with phone:', phoneNumber);
    let user = await User.findOne({ phone: phoneNumber });
    
    // If user doesn't exist, create a new one
    if (!user && name) {
      console.log('User not found, creating new user with name:', name);
      user = new User({
        name,
        phone: phoneNumber,
        addresses: []
      });
      await user.save();
      console.log('New user created with ID:', user._id);
    } else if (!user) {
      console.log('Login failed: User not found and no name provided for registration');
      return res.status(400).json({ success: false, message: 'User not found. Please provide a name to register.' });
    } else {
      console.log('User found:', user._id, user.name);
    }
    
    // Update login stats
    user.lastLogin = Date.now();
    user.loginCount += 1;
    
    // Generate tokens
    console.log('Generating tokens for user:', user._id);
    const accessToken = jwt.sign(
      { id: user._id, phone: user.phone },
      JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
    
    const refreshToken = jwt.sign(
      { id: user._id, phone: user.phone },
      JWT_REFRESH_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRY }
    );
    
    console.log('Tokens generated successfully');
    
    // Store tokens in user document
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    user.tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    user.refreshTokenExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    
    console.log('Saving user with updated tokens');
    await user.save();
    console.log('User saved successfully');
    
    // Set HttpOnly cookie for access token
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000, // 1 hour
      sameSite: 'strict'
    });
    
    // Set HttpOnly cookie for refresh token
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: 'strict'
    });
    
    // Return user data and tokens
    console.log('Sending successful login response');
    return res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        addresses: user.addresses,
        cart: user.cart || [],
        wishlist: user.wishlist || []
      },
      tokens: {
        accessToken,
        refreshToken,
        tokenExpiry: user.tokenExpiry,
        refreshTokenExpiry: user.refreshTokenExpiry
      },
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get user profile
router.route('/profile/:phoneNumber').get(verifyToken, async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    
    // Verify that the requested profile belongs to the authenticated user
    if (req.user.phone !== phoneNumber) {
      return res.status(403).json({ success: false, message: 'Unauthorized access to this profile' });
    }
    
    const user = await User.findOne({ phone: phoneNumber }).select('-accessToken -refreshToken -tokenExpiry -refreshTokenExpiry');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    return res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        addresses: user.addresses,
        cart: user.cart || [],
        wishlist: user.wishlist || []
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update user profile
router.route('/profile/:phoneNumber').put(verifyToken, async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    const { name, email } = req.body;
    
    // Verify that the requested profile belongs to the authenticated user
    if (req.user.phone !== phoneNumber) {
      return res.status(403).json({ success: false, message: 'Unauthorized access to this profile' });
    }
    
    const user = await User.findOne({ phone: phoneNumber });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    
    await user.save();
    
    return res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        addresses: user.addresses
      },
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Refresh token
router.route('/refresh-token').post(async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const cookieRefreshToken = req.cookies?.refreshToken;
    
    const token = refreshToken || cookieRefreshToken;
    
    if (!token) {
      return res.status(400).json({ success: false, message: 'Refresh token is required' });
    }
    
    // Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
    }
    
    // Find user by ID
    const user = await User.findById(decoded.id);
    
    if (!user || user.refreshToken !== token) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }
    
    // Check if refresh token is expired
    if (user.refreshTokenExpiry < new Date()) {
      return res.status(401).json({ success: false, message: 'Refresh token expired' });
    }
    
    // Generate new access token
    const accessToken = jwt.sign(
      { id: user._id, phone: user.phone },
      JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
    
    // Update user document
    user.accessToken = accessToken;
    user.tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    
    await user.save();
    
    // Set HttpOnly cookie for access token
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000, // 1 hour
      sameSite: 'strict'
    });
    
    return res.json({
      success: true,
      tokens: {
        accessToken,
        tokenExpiry: user.tokenExpiry
      },
      message: 'Token refreshed successfully'
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Logout
router.route('/logout').post(async (req, res) => {
  try {
    // Clear cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    
    // Get token from authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token) {
      try {
        // Verify token to get user ID
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Find user and clear tokens
        const user = await User.findById(decoded.id);
        if (user) {
          user.accessToken = null;
          user.refreshToken = null;
          user.tokenExpiry = null;
          user.refreshTokenExpiry = null;
          await user.save();
        }
      } catch (error) {
        // Token verification failed, but we still want to logout
        console.log('Invalid token during logout:', error.message);
      }
    }
    
    return res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Cart management
router.route('/cart/:phoneNumber').post(verifyToken, async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    const { productId, qty } = req.body;
    
    // Verify that the requested cart belongs to the authenticated user
    if (req.user.phone !== phoneNumber) {
      return res.status(403).json({ success: false, message: 'Unauthorized access to this cart' });
    }
    
    const user = await User.findOne({ phone: phoneNumber });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Initialize cart if it doesn't exist
    if (!user.cart) {
      user.cart = [];
    }
    
    // Check if product already exists in cart
    const existingProductIndex = user.cart.findIndex(item => item.productId === productId);
    
    if (existingProductIndex >= 0) {
      // Update quantity if product exists
      user.cart[existingProductIndex].quantity = qty;
    } else {
      // Add new product to cart
      user.cart.push({ productId, quantity: qty });
    }
    
    await user.save();
    
    return res.json({
      success: true,
      cart: user.cart,
      message: 'Cart updated successfully'
    });
  } catch (error) {
    console.error('Cart update error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Remove from cart
router.route('/cart/:phoneNumber/:productId').delete(verifyToken, async (req, res) => {
  try {
    const { phoneNumber, productId } = req.params;
    
    // Verify that the requested cart belongs to the authenticated user
    if (req.user.phone !== phoneNumber) {
      return res.status(403).json({ success: false, message: 'Unauthorized access to this cart' });
    }
    
    const user = await User.findOne({ phone: phoneNumber });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Remove product from cart
    if (user.cart) {
      user.cart = user.cart.filter(item => item.productId !== productId);
    }
    
    await user.save();
    
    return res.json({
      success: true,
      cart: user.cart,
      message: 'Product removed from cart'
    });
  } catch (error) {
    console.error('Cart remove error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Wishlist management
router.route('/wishlist/:phoneNumber').post(verifyToken, async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    const { productId } = req.body;
    
    // Verify that the requested wishlist belongs to the authenticated user
    if (req.user.phone !== phoneNumber) {
      return res.status(403).json({ success: false, message: 'Unauthorized access to this wishlist' });
    }
    
    const user = await User.findOne({ phone: phoneNumber });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Initialize wishlist if it doesn't exist
    if (!user.wishlist) {
      user.wishlist = [];
    }
    
    // Add to wishlist if not already there
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
    }
    
    await user.save();
    
    return res.json({
      success: true,
      wishlist: user.wishlist,
      message: 'Product added to wishlist'
    });
  } catch (error) {
    console.error('Wishlist add error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Remove from wishlist
router.route('/wishlist/:phoneNumber/:productId').delete(verifyToken, async (req, res) => {
  try {
    const { phoneNumber, productId } = req.params;
    
    // Verify that the requested wishlist belongs to the authenticated user
    if (req.user.phone !== phoneNumber) {
      return res.status(403).json({ success: false, message: 'Unauthorized access to this wishlist' });
    }
    
    const user = await User.findOne({ phone: phoneNumber });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Remove from wishlist
    if (user.wishlist) {
      user.wishlist = user.wishlist.filter(id => id !== productId);
    }
    
    await user.save();
    
    return res.json({
      success: true,
      wishlist: user.wishlist,
      message: 'Product removed from wishlist'
    });
  } catch (error) {
    console.error('Wishlist remove error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Address management
router.route('/addresses/:phoneNumber').get(verifyToken, async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    
    // Verify that the requested addresses belong to the authenticated user
    if (req.user.phone !== phoneNumber) {
      return res.status(403).json({ success: false, message: 'Unauthorized access to these addresses' });
    }
    
    const user = await User.findOne({ phone: phoneNumber });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    return res.json({
      success: true,
      addresses: user.addresses || []
    });
  } catch (error) {
    console.error('Addresses fetch error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Add address
router.route('/addresses/:phoneNumber').post(verifyToken, async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    const addressData = req.body;
    
    // Verify that the requested addresses belong to the authenticated user
    if (req.user.phone !== phoneNumber) {
      return res.status(403).json({ success: false, message: 'Unauthorized access to these addresses' });
    }
    
    // Validate address data
    if (!addressData.street || !addressData.city || !addressData.state || !addressData.pincode) {
      return res.status(400).json({ success: false, message: 'All address fields are required' });
    }
    
    const user = await User.findOne({ phone: phoneNumber });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Initialize addresses array if it doesn't exist
    if (!user.addresses) {
      user.addresses = [];
    }
    
    // If this is the first address or isDefault is true, set it as default
    if (user.addresses.length === 0 || addressData.isDefault) {
      // Set all existing addresses to non-default
      user.addresses.forEach(addr => addr.isDefault = false);
      addressData.isDefault = true;
    }
    
    // Add new address
    user.addresses.push(addressData);
    
    await user.save();
    
    return res.json({
      success: true,
      addresses: user.addresses,
      message: 'Address added successfully'
    });
  } catch (error) {
    console.error('Address add error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update address
router.route('/addresses/:phoneNumber/:addressId').put(verifyToken, async (req, res) => {
  try {
    const { phoneNumber, addressId } = req.params;
    const addressData = req.body;
    
    // Verify that the requested addresses belong to the authenticated user
    if (req.user.phone !== phoneNumber) {
      return res.status(403).json({ success: false, message: 'Unauthorized access to these addresses' });
    }
    
    const user = await User.findOne({ phone: phoneNumber });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Find address by ID
    const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);
    
    if (addressIndex === -1) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }
    
    // Update address fields
    if (addressData.street) user.addresses[addressIndex].street = addressData.street;
    if (addressData.city) user.addresses[addressIndex].city = addressData.city;
    if (addressData.state) user.addresses[addressIndex].state = addressData.state;
    if (addressData.pincode) user.addresses[addressIndex].pincode = addressData.pincode;
    if (addressData.country) user.addresses[addressIndex].country = addressData.country;
    
    // Handle default address setting
    if (addressData.isDefault) {
      // Set all addresses to non-default
      user.addresses.forEach(addr => addr.isDefault = false);
      // Set this address as default
      user.addresses[addressIndex].isDefault = true;
    }
    
    await user.save();
    
    return res.json({
      success: true,
      addresses: user.addresses,
      message: 'Address updated successfully'
    });
  } catch (error) {
    console.error('Address update error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete address
router.route('/addresses/:phoneNumber/:addressId').delete(verifyToken, async (req, res) => {
  try {
    const { phoneNumber, addressId } = req.params;
    
    // Verify that the requested addresses belong to the authenticated user
    if (req.user.phone !== phoneNumber) {
      return res.status(403).json({ success: false, message: 'Unauthorized access to these addresses' });
    }
    
    const user = await User.findOne({ phone: phoneNumber });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Find address by ID
    const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);
    
    if (addressIndex === -1) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }
    
    // Check if this is the default address
    const isDefault = user.addresses[addressIndex].isDefault;
    
    // Remove address
    user.addresses.splice(addressIndex, 1);
    
    // If the deleted address was the default and there are other addresses, set a new default
    if (isDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }
    
    await user.save();
    
    return res.json({
      success: true,
      addresses: user.addresses,
      message: 'Address deleted successfully'
    });
  } catch (error) {
    console.error('Address delete error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Set default address
router.route('/addresses/:phoneNumber/:addressId/default').patch(verifyToken, async (req, res) => {
  try {
    const { phoneNumber, addressId } = req.params;
    
    // Verify that the requested addresses belong to the authenticated user
    if (req.user.phone !== phoneNumber) {
      return res.status(403).json({ success: false, message: 'Unauthorized access to these addresses' });
    }
    
    const user = await User.findOne({ phone: phoneNumber });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Find address by ID
    const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);
    
    if (addressIndex === -1) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }
    
    // Set all addresses to non-default
    user.addresses.forEach(addr => addr.isDefault = false);
    
    // Set this address as default
    user.addresses[addressIndex].isDefault = true;
    
    await user.save();
    
    return res.json({
      success: true,
      addresses: user.addresses,
      message: 'Default address set successfully'
    });
  } catch (error) {
    console.error('Set default address error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Export router and middleware functions
module.exports = router;
module.exports.verifyToken = verifyToken;