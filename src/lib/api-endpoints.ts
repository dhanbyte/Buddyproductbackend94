/**
 * API Endpoints Configuration
 * 
 * This file contains all the API endpoints used in the application.
 * It provides a centralized place to manage API routes.
 */

// Base API URL - will be taken from environment variables
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// API Endpoints
export const ENDPOINTS = {
  // Product API
  PRODUCTS: '/products',                      // GET: Get all products
  PRODUCT_DETAIL: '/products/:id',           // GET: Get product by ID
  FEATURED_PRODUCTS: '/products/featured',   // GET: Get featured products
  
  // Admin API
  ADMIN_LOGIN: '/admin/login',               // POST: Admin login
  ADMIN_DASHBOARD: '/admin/dashboard-stats', // GET: Get dashboard stats
  
  // User API
  USERS: '/user',                           // GET: Get all users (admin)
  USER_DETAIL: '/user/:id',                 // GET: Get user by ID (admin)
  USER_PROFILE: '/user/profile',            // GET: Get user profile
  
  // Order API
  ORDERS_ALL: '/orders/all',                // GET: Get all orders (admin)
  ORDER_DETAIL: '/orders/:id',              // GET: Get order by ID
  ORDER_STATUS: '/orders/:id/status',       // PUT: Update order status
  PLACE_ORDER: '/orders',                   // POST: Place new order
  USER_ORDERS: '/orders/user',              // GET: Get user orders
  
  // Checkout API
  CHECKOUT_CALCULATE: '/checkout/calculate', // POST: Calculate checkout total
  
  // Search API
  SEARCH: '/search',                        // GET: Search products
  
  // Review API
  PRODUCT_REVIEWS: '/reviews/product/:id',   // GET: Get product reviews
  ADD_REVIEW: '/reviews',                    // POST: Add product review
  
  // Coupon API
  VALIDATE_COUPON: '/coupon/validate',       // POST: Validate coupon code

  // Auth API
  AUTH_LOGIN: '/auth/login',                 // POST: User login
  AUTH_REGISTER: '/auth/register',           // POST: User registration
};

/**
 * Helper function to get the full API URL
 * @param endpoint The API endpoint
 * @returns The full API URL
 */
export const getApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};

/**
 * Helper function to replace path parameters in the endpoint
 * @param endpoint The API endpoint with path parameters
 * @param params The path parameters to replace
 * @returns The endpoint with replaced path parameters
 */
export const replacePathParams = (endpoint: string, params: Record<string, string>): string => {
  let result = endpoint;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`:${key}`, value);
  });
  return result;
};

export default {
  API_BASE_URL,
  ENDPOINTS,
  getApiUrl,
  replacePathParams
};