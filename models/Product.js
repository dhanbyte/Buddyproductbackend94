const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  brand: { type: String },
  category: { type: String, required: true },
  subcategory: { type: String },
  price: {
    original: { type: Number, required: true },
    discounted: { type: Number },
    currency: { type: String, default: 'INR' },
  },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  extraImages: [{ type: String }],
  video: { type: String },
  description: { type: String },
  shortDescription: { type: String },
  features: [{ type: String }],
  specifications: { type: Map, of: String },
  tags: [{ type: String }],
  sku: { type: String },
  shippingCost: { type: Number },
  taxPercent: { type: Number },
  inventory: {
    inStock: { type: Boolean, default: true },
    lowStockThreshold: { type: Number, default: 5 },
  },
  codAvailable: { type: Boolean, default: false },
  returnPolicy: {
    eligible: { type: Boolean, default: true },
    duration: { type: Number, default: 7 },
  },
  warranty: { type: String },
  status: { type: String, default: 'active' },
  ratings: {
    average: { type: Number },
    count: { type: Number },
  },
  metaTitle: { type: String },
  metaDescription: { type: String },
  lastUpdated: { type: Date, default: Date.now },
});

// Adding indexes for better performance
productSchema.index({ id: 1 });
productSchema.index({ category: 1 });
productSchema.index({ slug: 1 });
productSchema.index({ 'price.discounted': 1 });
productSchema.index({ 'inventory.inStock': 1 });
productSchema.index({ tags: 1 });

// Pre-save hook to generate slug if not provided
productSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
      + '-' + this._id.toString().slice(-6); // Add part of ID for uniqueness
  }
  
  // Generate meta tags if not provided
  if (!this.metaTitle) {
    this.metaTitle = `${this.name} | ShopWeve - Best Price & Quality`;
  }
  
  if (!this.metaDescription) {
    this.metaDescription = this.shortDescription || 
      `Buy ${this.name} at best price. ${this.brand ? this.brand + ' ' : ''}${this.category} with fast delivery and easy returns.`;
  }
  
  this.lastUpdated = Date.now();
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
