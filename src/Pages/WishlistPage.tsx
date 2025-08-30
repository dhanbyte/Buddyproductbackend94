// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import { useUserContext } from '../data/UserContext';
import ProductCard from '../Components/ProductCard';
import { Link } from 'react-router-dom';
import { ProductAPI } from '../lib/api';

// Import Material-UI components
import {
    Container,
    Typography,
    Grid,
    Box,
    CircularProgress,
    Button
} from '@mui/material';

// Define the shape of the product object, ensuring it matches ProductCard's expectation
interface Product {
    _id: string;
    name: string;
    category: string;
    price: { original: number };
    image: string;
}

/**
 * WishlistPage Component
 * Displays a grid of products that the user has added to their wishlist.
 * It handles loading states and shows a message if the wishlist is empty.
 */
const WishlistPage: React.FC = () => {
    // Get wishlist from the user context
    const { wishlist } = useUserContext();
    
    // State for storing product data and loading status
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Effect to fetch product details based on wishlist IDs
    useEffect(() => {
        const fetchWishlistProducts = async () => {
            setLoading(true);
            // If wishlist is empty, no need to fetch
            if (wishlist.length === 0) {
                setProducts([]);
                setLoading(false);
                return;
            }

            try {
                // Fetch product data from the backend using the IDs in the wishlist
                const data = await ProductAPI.getProductsByIds(wishlist);
                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlistProducts();
    }, [wishlist]); // Rerun this effect whenever the wishlist changes

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                My Wishlist
            </Typography>

            {/* Show a loading spinner while fetching data */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                    <CircularProgress />
                </Box>
            ) : products.length > 0 ? (
                // If there are products, display them in a grid
                <Grid container spacing={3}>
                    {products.map((product) => (
                        <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                // If the wishlist is empty, show a message and a link to shop
                <Box sx={{ textAlign: 'center', py: 10 }}>
                    <Typography variant="h6" paragraph>
                        Your wishlist is empty.
                    </Typography>
                    <Typography color="text.secondary" paragraph>
                        Looks like you haven’t added anything to your wishlist yet.
                    </Typography>
                    <Button component={Link} to="/" variant="contained" size="large">
                        Discover Products
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default WishlistPage;