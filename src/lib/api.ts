/**
 * API client for Buddy Bazaar e-commerce platform
 * Handles all API requests to the backend server
 */

import { API_BASE_URL, ENDPOINTS, getApiUrl, replacePathParams } from './api-endpoints';

// HTTP method types
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// Default admin credentials
const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'admin123'
};

/**
 * Generic API fetch function for making HTTP requests
 */
export async function apiFetch<T>(
  path: string,
  options: {
    method?: HttpMethod;
    body?: any;
    adminPassword?: string;
    bearerToken?: string;
  } = {}
): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (options.adminPassword) headers['x-admin-key'] = options.adminPassword;
  if (options.bearerToken) headers['Authorization'] = `Bearer ${options.bearerToken}`;

  const res = await fetch(`${path.startsWith('http') ? '' : API_BASE_URL}${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

// Product API
export const ProductAPI = {
  /**
   * Get all products with optional filtering
   */
  getProducts: async (filters?: { 
    category?: string; 
    brand?: string; 
    minPrice?: number; 
    maxPrice?: number; 
    q?: string;
    page?: number;
    limit?: number;
  }) => {
    let queryString = '';
    if (filters) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
      queryString = `?${params.toString()}`;
    }
    return apiFetch(`${getApiUrl(ENDPOINTS.PRODUCTS)}${queryString}`);
  },

  /**
   * Get a single product by ID
   */
  getProductById: async (id: string) => {
    const endpoint = replacePathParams(ENDPOINTS.PRODUCT_DETAIL, { id });
    return apiFetch(getApiUrl(endpoint));
  },

  /**
   * Get multiple products by their IDs
   */
  getProductsByIds: async (ids: string[]) => {
    return apiFetch(getApiUrl(ENDPOINTS.PRODUCTS + '/by-ids'), {
      method: 'POST',
      body: { ids }
    });
  },

  /**
   * Create a new product (admin only)
   */
  createProduct: async (productData: any, adminPassword: string) => {
    return apiFetch(getApiUrl(ENDPOINTS.PRODUCTS), {
      method: 'POST',
      body: productData,
      adminPassword
    });
  },

  /**
   * Update an existing product (admin only)
   */
  updateProduct: async (id: string, productData: any, adminPassword: string) => {
    const endpoint = replacePathParams(ENDPOINTS.PRODUCT_DETAIL, { id });
    return apiFetch(getApiUrl(endpoint), {
      method: 'PUT',
      body: productData,
      adminPassword
    });
  },

  /**
   * Delete a product (admin only)
   */
  deleteProduct: async (id: string, adminPassword: string) => {
    const endpoint = replacePathParams(ENDPOINTS.PRODUCT_DETAIL, { id });
    return apiFetch(getApiUrl(endpoint), {
      method: 'DELETE',
      adminPassword
    });
  },

  /**
   * Get all products (admin only)
   */
  getAllProducts: async (adminPassword: string) => {
    return apiFetch(getApiUrl('/admin/products'), {
      adminPassword
    });
  }
};

// User API
export const UserAPI = {
  /**
   * Get current user profile
   */
  getProfile: async (token: string) => {
    return apiFetch(getApiUrl(ENDPOINTS.USER_PROFILE), {
      bearerToken: token
    });
  },

  /**
   * Add a new shipping address
   */
  addAddress: async (addressData: any, token: string) => {
    return apiFetch(getApiUrl(ENDPOINTS.USER_PROFILE + '/address'), {
      method: 'POST',
      body: addressData,
      bearerToken: token
    });
  },

  /**
   * Get user's wishlist
   */
  getWishlist: async (token: string) => {
    return apiFetch(getApiUrl(ENDPOINTS.USER_PROFILE + '/wishlist'), {
      bearerToken: token
    });
  },

  /**
   * Add product to wishlist
   */
  addToWishlist: async (productId: string, token: string) => {
    return apiFetch(getApiUrl(ENDPOINTS.USER_PROFILE + '/wishlist'), {
      method: 'POST',
      body: { productId },
      bearerToken: token
    });
  },

  /**
   * Remove product from wishlist
   */
  removeFromWishlist: async (productId: string, token: string) => {
    return apiFetch(getApiUrl(ENDPOINTS.USER_PROFILE + '/wishlist/' + productId), {
      method: 'DELETE',
      bearerToken: token
    });
  },

  /**
   * Get all users (admin only)
   */
  getAllUsers: async (adminPassword: string) => {
    return apiFetch(getApiUrl(ENDPOINTS.USERS), {
      adminPassword
    });
  },

  /**
   * Update user status (admin only)
   */
  updateUserStatus: async (userId: string, status: string, adminPassword: string) => {
    const endpoint = replacePathParams(ENDPOINTS.USER_DETAIL, { id: userId });
    return apiFetch(getApiUrl(endpoint + '/status'), {
      method: 'PUT',
      body: { status },
      adminPassword
    });
  }
};

// Order API
export const OrderAPI = {
  /**
   * Place a new order
   */
  placeOrder: async (orderData: {
    items: Array<{product: string, quantity: number}>;
    addressIndex: number;
    paymentMethod: string;
  }, token: string) => {
    return apiFetch(getApiUrl(ENDPOINTS.PLACE_ORDER), {
      method: 'POST',
      body: orderData,
      bearerToken: token
    });
  },

  /**
   * Get user's orders or all orders for admin
   */
  getOrders: async (token: string) => {
    return apiFetch(getApiUrl(ENDPOINTS.USER_ORDERS), {
      bearerToken: token
    });
  },

  /**
   * Get a specific order by ID
   */
  getOrderById: async (orderId: string, token: string) => {
    const endpoint = replacePathParams(ENDPOINTS.ORDER_DETAIL, { id: orderId });
    return apiFetch(getApiUrl(endpoint), {
      bearerToken: token
    });
  },

  /**
   * Update order status (admin only)
   */
  updateOrderStatus: async (orderId: string, status: string, adminPassword: string) => {
    const endpoint = replacePathParams(ENDPOINTS.ORDER_STATUS, { id: orderId });
    return apiFetch(getApiUrl(endpoint), {
      method: 'PUT',
      body: { status },
      adminPassword
    });
  },

  /**
   * Get all orders (admin only)
   */
  getAllOrders: async (adminPassword: string) => {
    return apiFetch(getApiUrl(ENDPOINTS.ORDERS_ALL), {
      adminPassword
    });
  }
};

// Admin API
export const AdminAPI = {
  /**
   * Get dashboard statistics
   */
  getDashboardStats: async (adminPassword: string) => {
    return apiFetch(getApiUrl(ENDPOINTS.ADMIN_DASHBOARD), {
      adminPassword
    });
  },

  /**
   * Login as admin
   */
  login: async (credentials: {username: string, password: string}) => {
    // For demo purposes, check against default credentials
    if (credentials.username === DEFAULT_ADMIN.username && 
        credentials.password === DEFAULT_ADMIN.password) {
      return { success: true, adminKey: DEFAULT_ADMIN.password };
    }
    
    // If not using default credentials, try the API
    try {
      return apiFetch(getApiUrl(ENDPOINTS.ADMIN_LOGIN), {
        method: 'POST',
        body: credentials
      });
    } catch (error) {
      throw new Error('Invalid admin credentials');
    }
  }
};

// Search API
export const SearchAPI = {
  /**
   * Search for products with query string
   */
  searchProducts: async (query: string | object) => {
    // If query is a string, use it as a search term
    if (typeof query === 'string') {
      return apiFetch(getApiUrl(`${ENDPOINTS.SEARCH}?q=${query}`));
    }
    
    // If query is an object, convert it to query parameters
    const params = new URLSearchParams();
    const queryObj = query as Record<string, string>;
    
    Object.keys(queryObj).forEach(key => {
      if (queryObj[key]) {
        params.append(key, queryObj[key]);
      }
    });
    
    return apiFetch(getApiUrl(`${ENDPOINTS.SEARCH}?${params.toString()}`));
  }
};

// Review API
export const ReviewAPI = {
  /**
   * Get reviews for a product
   */
  getProductReviews: async (productId: string) => {
    const endpoint = replacePathParams(ENDPOINTS.PRODUCT_REVIEWS, { id: productId });
    return apiFetch(getApiUrl(endpoint));
  },

  /**
   * Add a review for a product
   */
  addReview: async (productId: string, reviewData: {rating: number, comment: string}, token: string) => {
    return apiFetch(getApiUrl(ENDPOINTS.ADD_REVIEW), {
      method: 'POST',
      body: { productId, ...reviewData },
      bearerToken: token
    });
  }
};

// Checkout API
export const CheckoutAPI = {
  /**
   * Calculate checkout total
   */
  calculateTotal: async (items: Array<{productId: string, quantity: number}>, couponCode?: string) => {
    return apiFetch(getApiUrl(ENDPOINTS.CHECKOUT_CALCULATE), {
      method: 'POST',
      body: { items, couponCode }
    });
  },

  /**
   * Validate coupon code
   */
  validateCoupon: async (couponCode: string) => {
    return apiFetch(getApiUrl(ENDPOINTS.VALIDATE_COUPON), {
      method: 'POST',
      body: { code: couponCode }
    });
  }
};

// Auth API
export const AuthAPI = {
  /**
   * Login user
   */
  login: async (credentials: {email: string, password: string}) => {
    return apiFetch(getApiUrl(ENDPOINTS.AUTH_LOGIN), {
      method: 'POST',
      body: credentials
    });
  },

  /**
   * Register user
   */
  register: async (userData: {name: string, email: string, password: string}) => {
    return apiFetch(getApiUrl(ENDPOINTS.AUTH_REGISTER), {
      method: 'POST',
      body: userData
    });
  }
};


