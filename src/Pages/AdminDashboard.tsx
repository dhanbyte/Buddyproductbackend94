import React, { useState, useEffect } from 'react';
import { FiUsers, FiPackage, FiShoppingBag, FiEdit, FiTrash2, FiEye, FiDollarSign, FiBarChart2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { AdminAPI, ProductAPI, OrderAPI, UserAPI } from '../lib/api';
import { useNavigate } from 'react-router-dom';

// Material UI Imports
import { 
  Box, Typography, Grid, Paper, Card, CardContent, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, IconButton, Chip, Avatar, Divider, CircularProgress, Alert,
  TextField, MenuItem, Select, FormControl, InputLabel, List, ListItem, ListItemText,
  Tabs, Tab
} from '@mui/material';

// Material UI Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Material UI imports
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Divider,
  CircularProgress,
  IconButton,
  Alert,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';

// Import icons
import { 
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  ShoppingCart as ShoppingCartIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';

interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  items: Array<{
    product: {
      _id: string;
      name: string;
      price: number;
    };
    quantity: number;
  }>;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  createdAt: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
  brand: string;
  images: string[];
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "blocked";
}

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  pendingOrders: number;
  lowStockProducts: number;
  todaySales: number;
  monthlySales: number;
  yearlySales: number;
  topSellingProducts: Array<{
    _id: string;
    name: string;
    totalSold: number;
  }>;
  recentOrders: Order[];
}

// Removing duplicate interfaces that are causing conflicts

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"dashboard" | "users" | "products" | "orders">("dashboard");
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0, category: "", quantity: 0, brand: "", description: "", image: "", images: [] });

  // Fetch dashboard stats
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const adminKey = localStorage.getItem('adminKey');
        if (!adminKey) {
          navigate('/admin-login');
          return;
        }
        
        const stats = await AdminAPI.getDashboardStats(adminKey);
        setDashboardStats(stats);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard data. Please try again.');
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [navigate]);

  // Fetch users when users tab is active
  useEffect(() => {
    if (activeTab === 'users') {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const adminKey = localStorage.getItem('adminKey');
          if (!adminKey) {
            navigate('/admin-login');
            return;
          }
          const usersData = await UserAPI.getAllUsers(adminKey);
          setUsers(usersData);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching users:', err);
          setError('Failed to load users data. Please try again.');
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [activeTab, navigate]);

  // Fetch products when products tab is active
  useEffect(() => {
    if (activeTab === 'products') {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const productsData = await ProductAPI.getProducts();
          setProducts(productsData);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching products:', err);
          setError('Failed to load products data. Please try again.');
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [activeTab]);

  // Fetch orders when orders tab is active
  useEffect(() => {
    if (activeTab === 'orders') {
      const fetchOrders = async () => {
        try {
          setLoading(true);
          const adminKey = localStorage.getItem('adminKey');
          if (!adminKey) {
            navigate('/admin-login');
            return;
          }
          const ordersData = await OrderAPI.getOrders(adminKey);
          setOrders(ordersData);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching orders:', err);
          setError('Failed to load orders data. Please try again.');
          setLoading(false);
        }
      };

      fetchOrders();
    }
  }, [activeTab, navigate]);

  // Stats cards data
  const stats = dashboardStats ? [
    { 
      title: "Total Users", 
      count: dashboardStats.totalUsers, 
      icon: <PeopleIcon fontSize="large" />,
      color: '#3f51b5',
      bgColor: '#e8eaf6'
    },
    { 
      title: "Total Products", 
      count: dashboardStats.totalProducts, 
      icon: <InventoryIcon fontSize="large" />,
      color: '#f44336',
      bgColor: '#ffebee'
    },
    { 
      title: "Total Orders", 
      count: dashboardStats.totalOrders, 
      icon: <ShoppingCartIcon fontSize="large" />,
      color: '#4caf50',
      bgColor: '#e8f5e9'
    },
    { 
      title: "Total Revenue", 
      count: `₹${dashboardStats.totalRevenue}`, 
      icon: <FiDollarSign size={24} />,
      color: '#ff9800',
      bgColor: '#fff3e0'
    },
    { 
      title: "Today's Sales", 
      count: `₹${dashboardStats.todaySales}`, 
      icon: <FiBarChart2 size={24} />,
      color: '#2196f3',
      bgColor: '#e3f2fd'
    },
    { 
      title: "Pending Orders", 
      count: dashboardStats.pendingOrders, 
      icon: <FiShoppingBag size={24} />,
      color: '#9c27b0',
      bgColor: '#f3e5f5'
    }
  ] : [];

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.brand || !newProduct.quantity || !newProduct.description || !newProduct.image) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const adminKey = localStorage.getItem('adminKey');
      if (!adminKey) {
        navigate('/admin-login');
        return;
      }
      const createdProduct = await ProductAPI.createProduct(newProduct, adminKey);
      setProducts([...products, createdProduct]);
      setIsAddingProduct(false);
      setNewProduct({ name: "", price: 0, category: "", quantity: 0, brand: "", description: "", image: "", images: [] });
      toast.success("Product added successfully!");
    } catch (err) {
      console.error('Error adding product:', err);
      toast.error("Failed to add product. Please try again.");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const adminKey = localStorage.getItem('adminKey');
      if (!adminKey) {
        navigate('/admin-login');
        return;
      }
      await ProductAPI.deleteProduct(id, adminKey);
      setProducts(products.filter(p => p._id !== id));
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.error('Error deleting product:', err);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      const adminKey = localStorage.getItem('adminKey');
      if (!adminKey) {
        navigate('/admin-login');
        return;
      }
      await OrderAPI.updateOrderStatus(orderId, status, adminKey);
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status } : order
      ));
      toast.success(`Order status updated to ${status}!`);
    } catch (err) {
      console.error('Error updating order status:', err);
      toast.error("Failed to update order status. Please try again.");
    }
  };

  const handleToggleUserStatus = async (userId: string, currentStatus: "active" | "blocked") => {
    try {
      const adminKey = localStorage.getItem('adminKey');
      if (!adminKey) {
        navigate('/admin-login');
        return;
      }
      const newStatus = currentStatus === "active" ? "blocked" : "active";
      // Note: This API endpoint needs to be implemented in the backend
      await UserAPI.updateUserStatus(userId, newStatus, adminKey);
      setUsers(users.map(user => {
        if (user._id === userId) {
          toast.success(`User ${user.name} ${newStatus}!`);
          return { ...user, status: newStatus };
        }
        return user;
      }));
    } catch (err) {
      console.error('Error updating user status:', err);
      toast.error("Failed to update user status. Please try again.");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'white', boxShadow: 1 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
          <Box sx={{ py: 2 }}>
            <Typography variant="h4" fontWeight="bold" color="text.primary">Admin Dashboard</Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 4 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        ) : (
          <>
            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper sx={{ p: 3, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: stat.bgColor, 
                          color: stat.color,
                          width: 48, 
                          height: 48 
                        }}
                      >
                        {stat.icon}
                      </Avatar>
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          {stat.title}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          {stat.count}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* Navigation Tabs */}
            <Paper sx={{ mb: 3, borderRadius: 2 }}>
              <Tabs 
                value={activeTab} 
                onChange={(_, newValue) => setActiveTab(newValue)}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
              >
                {["dashboard", "users", "products", "orders"].map((tab) => (
                  <Tab 
                    key={tab} 
                    value={tab}
                    label={tab.charAt(0).toUpperCase() + tab.slice(1)} 
                  />
                ))}
              </Tabs>
            </Paper>
          </>
        )}

        {/* Content Sections */}
        {!loading && !error && (
          <div className="bg-white shadow-sm rounded-lg p-6">
            {/* Dashboard Overview */}
            {activeTab === "dashboard" && dashboardStats && (
              <Box>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                  Dashboard Overview
                </Typography>
                
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  {/* Recent Orders */}
                  <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                        Recent Orders
                      </Typography>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Order ID</TableCell>
                              <TableCell>Customer</TableCell>
                              <TableCell>Date</TableCell>
                              <TableCell>Total</TableCell>
                              <TableCell>Status</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {dashboardStats.recentOrders.map((order) => (
                              <TableRow key={order._id}>
                                <TableCell>{order._id.substring(0, 8)}</TableCell>
                                <TableCell>{order.user?.name || 'N/A'}</TableCell>
                                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>₹{order.totalAmount}</TableCell>
                                <TableCell>
                                  <Chip 
                                    size="small"
                                    label={order.status}
                                    color={
                                      order.status === "delivered" ? "success" : 
                                      order.status === "shipped" ? "primary" : 
                                      "warning"
                                    }
                                    variant="outlined"
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>

                  {/* Top Selling Products */}
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                        Top Selling Products
                      </Typography>
                      <List sx={{ width: '100%' }} disablePadding>
                        {dashboardStats.topSellingProducts.map((product, index) => (
                          <React.Fragment key={product._id}>
                            {index > 0 && <Divider component="li" />}
                            <ListItem>
                              <ListItemText 
                                primary={product.name}
                                secondary={`${product.totalSold} sold`}
                              />
                            </ListItem>
                          </React.Fragment>
                        ))}
                      </List>
                    </Paper>
                  </Grid>
                </Grid>
                
                {/* Sales Overview */}
                <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                    Sales Overview
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ p: 2, bgcolor: 'primary.light', borderRadius: 2, color: 'primary.dark' }}>
                        <Typography variant="subtitle2" fontWeight="medium">
                          Today's Sales
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                          ₹{dashboardStats.todaySales}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ p: 2, bgcolor: 'success.light', borderRadius: 2, color: 'success.dark' }}>
                        <Typography variant="subtitle2" fontWeight="medium">
                          Monthly Sales
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                          ₹{dashboardStats.monthlySales}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ p: 2, bgcolor: 'secondary.light', borderRadius: 2, color: 'secondary.dark' }}>
                        <Typography variant="subtitle2" fontWeight="medium">
                          Yearly Sales
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                          ₹{dashboardStats.yearlySales}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            )}
            
            {/* Users Management */}
            {activeTab === "users" && (
              <Box>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                  User Management
                </Typography>
                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar 
                                sx={{ width: 32, height: 32, mr: 1, bgcolor: user.status === "active" ? 'primary.main' : 'text.disabled' }}
                              >
                                {user.name.charAt(0)}
                              </Avatar>
                              <Typography variant="body2" fontWeight="medium">
                                {user.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Chip 
                              label={user.role}
                              size="small"
                              color={user.role === "admin" ? "secondary" : "default"}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={user.status}
                              size="small"
                              color={user.status === "active" ? "success" : "error"}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              size="small"
                              color={user.status === "active" ? "error" : "success"}
                              onClick={() => handleToggleUserStatus(user._id, user.status)}
                            >
                              {user.status === "active" ? "Block" : "Unblock"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

          {/* Products Management */}
          {activeTab === "products" && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" fontWeight="bold">Product Management</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => setIsAddingProduct(true)}
                >
                  Add New Product
                </Button>
              </Box>

              {isAddingProduct && (
                <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                  <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>Add New Product</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Product Name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        variant="outlined"
                        size="small"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Price"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                        variant="outlined"
                        size="small"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Category"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                        variant="outlined"
                        size="small"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Quantity"
                        type="number"
                        value={newProduct.quantity}
                        onChange={(e) => setNewProduct({...newProduct, quantity: Number(e.target.value)})}
                        variant="outlined"
                        size="small"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Brand"
                        value={newProduct.brand}
                        onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                        variant="outlined"
                        size="small"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Image URL"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                        variant="outlined"
                        size="small"
                        required
                        helperText="Enter a valid image URL"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={3}
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        variant="outlined"
                        required
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleAddProduct}
                    >
                      Save Product
                    </Button>
                    <Button
                      variant="contained"
                      color="inherit"
                      onClick={() => setIsAddingProduct(false)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Paper>
              )}

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Brand</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell>
                          <Avatar 
                            src={product.image} 
                            alt={product.name}
                            variant="rounded"
                            sx={{ width: 50, height: 50 }}
                          />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>₹{product.price}</TableCell>
                        <TableCell>
                          <Chip label={product.category} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.brand}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton size="small" color="primary" title="View">
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" color="success" title="Edit">
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              title="Delete"
                              onClick={() => handleDeleteProduct(product._id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* Orders Management */}
          {activeTab === "orders" && (
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                Order Management
              </Typography>
              <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Products</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Payment Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell>{order._id.substring(0, 8)}</TableCell>
                        <TableCell>{order.user?.name || 'N/A'}</TableCell>
                        <TableCell>
                          {order.items.map(item => (
                            <Box key={item.product._id} sx={{ mb: 0.5 }}>
                              {item.product.name} x {item.quantity}
                            </Box>
                          ))}
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight="medium">₹{order.totalAmount}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={order.status}
                            size="small"
                            color={
                              order.status === "delivered" ? "success" : 
                              order.status === "shipped" ? "primary" : 
                              order.status === "cancelled" ? "error" :
                              "warning"
                            }
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={order.paymentStatus}
                            size="small"
                            color={
                              order.paymentStatus === "paid" ? "success" : 
                              order.paymentStatus === "pending" ? "warning" : 
                              "error"
                            }
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                            <Select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                              displayEmpty
                            >
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="shipped">Shipped</MenuItem>
                              <MenuItem value="delivered">Delivered</MenuItem>
                              <MenuItem value="cancelled">Cancelled</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </div>
      )}
      </div>
    </div>
  );
};

export default AdminDashboard;