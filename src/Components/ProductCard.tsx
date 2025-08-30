// Import necessary libraries and components
import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../data/UserContext';
import { useAuth } from '@clerk/clerk-react';

// Import Material-UI components
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Box,
    Tooltip,
    CardActionArea
} from '@mui/material';

// Import icons
import { FiShoppingCart, FiHeart } from 'react-icons/fi';

// Define the structure of the product object
interface Product {
    _id: string;
    name: string;
    category: string;
    price: { original: number };
    image: string;
}

interface ProductCardProps {
    product: Product;
}

/**
 * ProductCard Component
 * Displays a single product in a visually appealing card format using Material-UI.
 * It includes actions for adding to cart and managing the wishlist.
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { isSignedIn } = useAuth();
    const { isInWishlist, addToWishlist, removeFromWishlist, addToCart } = useUserContext();
    const isLiked = isInWishlist(product._id);

    /**
     * Handles the click event on the wishlist (heart) icon.
     * Prevents the event from bubbling up to the parent Link component.
     * Adds or removes the product from the wishlist.
     */
    const handleLikeClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation
        e.stopPropagation();
        if (!isSignedIn) return; // Safety check, though button should be disabled

        isLiked ? removeFromWishlist(product._id) : addToWishlist(product._id);
    };

    /**
     * Handles the click event on the shopping cart icon.
     */
    const handleAddToCartClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Assuming addToCart takes the product object or ID
        addToCart(product); 
        // You might want to show a toast notification here
    };

    // Fix image URL to use local images if external URL fails
    const imageUrl = product.image?.startsWith('http') 
        ? product.image 
        : product.image?.startsWith('/') 
            ? product.image 
            : `/Images/${product.image}` || '/Images/pro1.webp';

    return (
        <Card sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            position: 'relative', 
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
            '&:hover': { 
                transform: 'translateY(-5px)', 
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)', 
            } 
        }}>
            {/* Wishlist button positioned at the top-right corner */}
            <Tooltip title={!isSignedIn ? "Please sign in to use wishlist" : (isLiked ? "Remove from Wishlist" : "Add to Wishlist")}>
                <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2, backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '50%' }}>
                    <IconButton onClick={handleLikeClick} disabled={!isSignedIn}>
                        <FiHeart style={{ color: isLiked ? '#d32f2f' : 'inherit', fill: isLiked ? '#d32f2f' : 'none' }} />
                    </IconButton>
                </Box>
            </Tooltip>

            {/* The main clickable area of the card */}
            <CardActionArea component={Link} to={`/product/${product._id}`} sx={{ flexGrow: 1 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={imageUrl}
                    alt={product.name}
                    sx={{ 
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                            transform: 'scale(1.05)'
                        }
                    }}
                />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Box sx={{ 
                        display: 'inline-block', 
                        bgcolor: 'primary.light', 
                        color: 'white', 
                        px: 1, 
                        py: 0.5, 
                        borderRadius: 1, 
                        mb: 1,
                        fontSize: '0.75rem'
                    }}>
                        {product.category}
                    </Box>
                    <Typography variant="h6" component="div" sx={{ 
                        mb: 1, 
                        height: '3rem', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        lineHeight: 1.2
                    }}>
                        {product.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            
            {/* Bottom section with price and add-to-cart button */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                p: 2,
                bgcolor: 'background.paper',
                borderTop: '1px solid',
                borderColor: 'divider'
            }}>
                <Box>
                    <Typography variant="h5" color="primary" fontWeight="bold" sx={{ fontSize: '1.25rem' }}>
                        ₹{product.price.original}
                    </Typography>
                </Box>
                <Tooltip title="Add to Cart">
                    <IconButton 
                        color="primary" 
                        onClick={handleAddToCartClick}
                        sx={{ 
                            bgcolor: 'primary.main', 
                            color: 'white',
                            '&:hover': {
                                bgcolor: 'primary.dark'
                            }
                        }}
                    >
                        <FiShoppingCart />
                    </IconButton>
                </Tooltip>
            </Box>
        </Card>
    );
};

export default ProductCard;
