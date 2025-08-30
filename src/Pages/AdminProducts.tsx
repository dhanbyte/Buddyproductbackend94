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
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Alert
} from '@mui/material';

// Import icons from react-icons
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

// Define the structure of a Product object
interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    stock: number;
}

// Initial state for the product form
const initialFormData = {
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    stock: 0,
};

/**
 * AdminProducts Component
 * This component provides a full CRUD (Create, Read, Update, Delete) interface
 * for managing products in the e-commerce system. It features a Material-UI table
 * to display products and modal dialogs for adding, editing, and deleting products.
 */
const AdminProducts: React.FC = () => {
    // Component State
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // State for the Add/Edit Product Modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState(initialFormData);

    // State for the Delete Confirmation Dialog
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);

    // Clerk authentication hook to get the auth token
    const { getToken } = useAuth();

    // --- API Communication ---

    /**
     * Fetches all products from the backend API.
     * useCallback is used to memoize the function for performance.
     */
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const token = await getToken();
            const response = await fetch('http://localhost:5000/api/admin/products', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch products. Please try again later.');
            }
            const data = await response.json();
            setProducts(data);
        } catch (err: any) {
            console.error('Error fetching products:', err);
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    }, [getToken]);

    // Fetch products when the component mounts
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    /**
     * Handles form submission for both creating and updating products.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const method = selectedProduct ? 'PUT' : 'POST';
        const url = selectedProduct
            ? `http://localhost:5000/api/products/${selectedProduct._id}`
            : 'http://localhost:5000/api/products';

        try {
            const token = await getToken();
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save the product.');
            }
            
            // If successful, refresh product list and close the modal
            fetchProducts();
            handleCloseModal();

        } catch (err: any) {
            console.error('Error saving product:', err);
            setError(err.message || 'An unexpected error occurred while saving.');
        }
    };

    /**
     * Handles the deletion of a product after confirmation.
     */
    const handleDeleteConfirm = async () => {
        if (!productToDelete) return;
        setError(null);

        try {
            const token = await getToken();
            const response = await fetch(`http://localhost:5000/api/products/${productToDelete}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error('Failed to delete product.');
            }

            // If successful, refresh product list and close the delete dialog
            fetchProducts();
            handleCloseDeleteDialog();

        } catch (err: any) {
            console.error('Error deleting product:', err);
            setError(err.message || 'An unexpected error occurred while deleting.');
        }
    };

    // --- Modal and Dialog Handlers ---

    /**
     * Opens the modal for adding a new product or editing an existing one.
     * @param {Product | null} product - The product to edit, or null to add a new one.
     */
    const handleOpenModal = (product: Product | null) => {
        setSelectedProduct(product);
        setFormData(product ? { ...product } : initialFormData);
        setIsModalOpen(true);
        setError(null); // Clear previous errors when opening modal
    };

    /**
     * Closes the Add/Edit modal and resets the form state.
     */
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
        setFormData(initialFormData);
    };

    /**
     * Opens the delete confirmation dialog.
     * @param {string} productId - The ID of the product to be deleted.
     */
    const handleOpenDeleteDialog = (productId: string) => {
        setProductToDelete(productId);
        setIsDeleteDialogOpen(true);
    };

    /**
     * Closes the delete confirmation dialog.
     */
    const handleCloseDeleteDialog = () => {
        setProductToDelete(null);
        setIsDeleteDialogOpen(false);
    };

    // --- Render Logic ---

    // Display a loading spinner while data is being fetched
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Page Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Product Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<FiPlus />}
                    onClick={() => handleOpenModal(null)}
                >
                    Add Product
                </Button>
            </Box>

            {/* Display any errors that occur */}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {/* Products Table */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Stock</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>
                                    <img src={product.image} alt={product.name} style={{ height: 50, width: 50, objectFit: 'cover', borderRadius: '4px' }} />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {product.name}
                                </TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell align="right">₹{product.price.toFixed(2)}</TableCell>
                                <TableCell align="right">{product.stock}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" onClick={() => handleOpenModal(product)}>
                                        <FiEdit2 />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(product._id)}>
                                        <FiTrash2 />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add/Edit Product Modal */}
            <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
                <DialogTitle>{selectedProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Product Name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="category"
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="stock"
                            label="Stock"
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="image"
                            label="Image URL"
                            name="image"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button type="submit" variant="contained" onClick={handleSubmit}>
                        {selectedProduct ? 'Update Product' : 'Add Product'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={isDeleteDialogOpen}
                onClose={handleCloseDeleteDialog}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this product? This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AdminProducts;