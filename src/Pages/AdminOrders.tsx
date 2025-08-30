// Import necessary libraries and components
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';

// Import Material-UI components for a professional UI
import {
    Container,
    Typography,
    Button,
    Box,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Alert,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material';

// Import icons
import { FiDownload } from 'react-icons/fi';

// --- Type Definitions ---

// Structure for a single item within an order
interface OrderItem {
    product: {
        name: string;
        price: number;
        image: string;
    };
    quantity: number;
}

// Structure for the main Order object
interface Order {
    _id: string;
    user: {
        name: string;
        email: string;
    };
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: {
        address: string;
        city: string;
        state: string;
        pin: string;
        phone: string;
    };
    createdAt: string;
}

// Color mapping for order status chips
const statusColors: { [key in Order['status']]: 'warning' | 'info' | 'primary' | 'success' | 'error' } = {
    pending: 'warning',
    processing: 'info',
    shipped: 'primary',
    delivered: 'success',
    cancelled: 'error',
};


/**
 * AdminOrders Component
 * This component allows administrators to view, manage, and export customer orders.
 * It features filtering, a detailed order view, and status management functionalities.
 */
const AdminOrders: React.FC = () => {
    // --- Component State ---
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('all');
    
    // State for the Order Details Modal
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { getToken } = useAuth();

    // --- API Communication ---

    /**
     * Fetches all orders from the backend API.
     */
    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const token = await getToken();
            const response = await fetch('http://localhost:5000/api/admin/orders', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error('Failed to fetch orders.');
            const data = await response.json();
            setOrders(data);
        } catch (err: any) {
            console.error('Error fetching orders:', err);
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    }, [getToken]);

    // Fetch orders on component mount
    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    /**
     * Updates the status of a specific order.
     * @param {string} orderId - The ID of the order to update.
     * @param {string} status - The new status for the order.
     */
    const handleStatusChange = async (orderId: string, status: string) => {
        setError(null);
        try {
            const token = await getToken();
            const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });
            if (!response.ok) throw new Error('Failed to update order status.');
            
            // On success, refresh the orders list and close the modal
            fetchOrders();
            handleCloseModal();
        } catch (err: any) {
            console.error('Error updating order status:', err);
            setError(err.message || 'An unexpected error occurred.');
        }
    };

    // --- UI Handlers ---

    /**
     * Opens the details modal for a selected order.
     * @param {Order} order - The order to display in the modal.
     */
    const handleOpenModal = (order: Order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    /**
     * Closes the order details modal.
     */
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    /**
     * Filters orders based on the selected status.
     */
    const filteredOrders = orders.filter(order =>
        filter === 'all' ? true : order.status === filter
    );

    /**
     * Exports the currently filtered orders to a CSV file.
     */
    const exportOrders = () => {
        const csvHeader = ['Order ID', 'Customer Name', 'Customer Email', 'Phone', 'Address', 'Items', 'Total Amount', 'Status', 'Date'];
        const csvRows = filteredOrders.map(order => [
            order._id,
            order.user.name,
            order.user.email,
            order.shippingAddress.phone,
            `'''${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pin}'''`,
            order.items.map(item => `${item.product.name} (x${item.quantity})`).join('; '),
            order.totalAmount,
            order.status,
            new Date(order.createdAt).toLocaleDateString()
        ]);

        const csvContent = [csvHeader, ...csvRows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'orders.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // --- Render Logic ---

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}><CircularProgress /></Box>;
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {/* Page Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                <Typography variant="h4" component="h1">
                    Order Management
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <FormControl sx={{ minWidth: 200 }} size="small">
                        <InputLabel>Filter by Status</InputLabel>
                        <Select
                            value={filter}
                            label="Filter by Status"
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <MenuItem value="all">All Orders</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="processing">Processing</MenuItem>
                            <MenuItem value="shipped">Shipped</MenuItem>
                            <MenuItem value="delivered">Delivered</MenuItem>
                            <MenuItem value="cancelled">Cancelled</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="outlined"
                        startIcon={<FiDownload />}
                        onClick={exportOrders}
                    >
                        Export
                    </Button>
                </Box>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {/* Orders Table */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 750 }}>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.map((order) => (
                            <TableRow hover key={order._id}>
                                <TableCell>#{order._id.slice(-6)}</TableCell>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="bold">{order.user.name}</Typography>
                                    <Typography variant="caption" color="text.secondary">{order.user.email}</Typography>
                                </TableCell>
                                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell align="right">₹{order.totalAmount.toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <Chip label={order.status} color={statusColors[order.status]} size="small" sx={{ textTransform: 'capitalize' }} />
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" size="small" onClick={() => handleOpenModal(order)}>
                                        Manage
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Order Details and Management Modal */}
            {selectedOrder && (
                <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
                    <DialogTitle>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            Order Details #{selectedOrder._id.slice(-6)}
                            <Chip label={selectedOrder.status} color={statusColors[selectedOrder.status]} sx={{ textTransform: 'capitalize' }} />
                        </Box>
                    </DialogTitle>
                    <DialogContent dividers>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom>Customer & Shipping</Typography>
                                <Paper variant="outlined" sx={{ p: 2 }}>
                                    <Typography variant="body1" fontWeight="bold">{selectedOrder.user.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">{selectedOrder.user.email}</Typography>
                                    <Typography variant="body2" color="text.secondary">{selectedOrder.shippingAddress.phone}</Typography>
                                    <Divider sx={{ my: 1 }} />
                                    <Typography variant="body2">{selectedOrder.shippingAddress.address}</Typography>
                                    <Typography variant="body2">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pin}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom>Order Items</Typography>
                                <List disablePadding>
                                    {selectedOrder.items.map((item, index) => (
                                        <ListItem key={index} divider>
                                            <ListItemText 
                                                primary={`${item.product.name} (x${item.quantity})`}
                                                secondary={`Price: ₹${item.product.price.toFixed(2)}`}
                                            />
                                            <Typography variant="body1" fontWeight="bold">₹{(item.product.price * item.quantity).toFixed(2)}</Typography>
                                        </ListItem>
                                    ))}
                                    <ListItem>
                                        <ListItemText primary="Total Amount" />
                                        <Typography variant="h6" fontWeight="bold">₹{selectedOrder.totalAmount.toFixed(2)}</Typography>
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
                        <Button onClick={handleCloseModal} color="secondary">Close</Button>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {/* --- Action Buttons based on current status --- */}
                            {selectedOrder.status === 'pending' && (
                                <Button variant="contained" color="info" onClick={() => handleStatusChange(selectedOrder._id, 'processing')}>
                                    Accept Order
                                </Button>
                            )}
                            {selectedOrder.status === 'processing' && (
                                <Button variant="contained" color="primary" onClick={() => handleStatusChange(selectedOrder._id, 'shipped')}>
                                    Mark as Shipped
                                </Button>
                            )}
                            {selectedOrder.status === 'shipped' && (
                                <Button variant="contained" color="success" onClick={() => handleStatusChange(selectedOrder._id, 'delivered')}>
                                    Mark as Delivered
                                </Button>
                            )}
                            {/* Allow cancellation if not delivered or already cancelled */}
                            {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
                                <Button variant="contained" color="error" onClick={() => handleStatusChange(selectedOrder._id, 'cancelled')}>
                                    Cancel Order
                                </Button>
                            )}
                        </Box>
                    </DialogActions>
                </Dialog>
            )}
        </Container>
    );
};

export default AdminOrders;