const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true, unique: true },
  addresses: [{
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: 'India' },
    isDefault: { type: Boolean, default: false }
  }],
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  loginCount: { type: Number, default: 1 },
  accessToken: { type: String },
  refreshToken: { type: String },
  tokenExpiry: { type: Date },
  refreshTokenExpiry: { type: Date },
  cart: [{
    productId: { type: String, required: true },
    quantity: { type: Number, default: 1 }
  }],
  wishlist: [{ type: String }], // Array of product IDs
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  status: { type: String, enum: ['active', 'inactive', 'blocked'], default: 'active' }
});

// Add indexes for better performance
userSchema.index({ phone: 1 }, { unique: true });
userSchema.index({ email: 1 });
userSchema.index({ lastLogin: -1 }); // For finding recently logged in users
userSchema.index({ status: 1 });

// Methods for token management
userSchema.methods.generateTokens = function() {
  const crypto = require('crypto');
  
  // Generate access token (valid for 1 hour)
  this.accessToken = crypto.randomBytes(32).toString('hex');
  this.tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  
  // Generate refresh token (valid for 30 days)
  this.refreshToken = crypto.randomBytes(48).toString('hex');
  this.refreshTokenExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  
  return {
    accessToken: this.accessToken,
    refreshToken: this.refreshToken,
    tokenExpiry: this.tokenExpiry,
    refreshTokenExpiry: this.refreshTokenExpiry
  };
};

userSchema.methods.refreshAccessToken = function() {
  const crypto = require('crypto');
  
  // Generate new access token
  this.accessToken = crypto.randomBytes(32).toString('hex');
  this.tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  
  return {
    accessToken: this.accessToken,
    tokenExpiry: this.tokenExpiry
  };
};

userSchema.methods.updateLoginStats = function() {
  this.lastLogin = Date.now();
  this.loginCount += 1;
  return this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;