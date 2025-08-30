// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ProductCard from './Components/ProductCard';
import { ProductAPI } from './lib/api';
import { ENDPOINTS, getApiUrl } from './lib/api-endpoints';

// Import Material-UI components
import {
    Container, Typography, Button, Box, Grid, Card, CardMedia, CardActionArea, 
    IconButton, Paper, Avatar, CardContent
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Import icons
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { LocalShipping, HighQuality, SupportAgent } from '@mui/icons-material';

// --- Type Definitions ---
interface HomeProduct {
    _id: string; name: string; category: string; price: { original: number }; image: string;
}

// --- Mock Data ---
const heroSlides = [
    { image: '/Images/BundleGadget.jpg', title: 'Latest Tech Gadgets', subtitle: 'Explore the future of technology', link: '/tech' },
    { image: '/Images/deodap1.webp', title: 'Summer Fashion Collection', subtitle: 'Stay stylish with our new arrivals', link: '/fashion' },
    { image: '/Images/deodap3.jpg', title: 'Fresh Groceries Daily', subtitle: 'Delivered right to your doorstep', link: '/ayurvedic' },
];

const categories = [
    { name: 'Gadgets', image: '/Images/pro1.webp', link: '/tech' },
    { name: 'Fashion', image: '/Images/pro2.webp', link: '/fashion' },
    { name: 'Ayurveda', image: '/Images/deodap4.webp', link: '/ayurvedic' },
    { name: 'Home Decor', image: '/Images/pro4.webp', link: '/' },
];

const testimonials = [
    { name: 'Rohan S.', review: 'Incredible quality and fast delivery! I am very impressed with the service and the product.', avatar: 'R' },
    { name: 'Priya M.', review: 'BazaarBuddy has become my go-to for online shopping. The variety is amazing and the prices are unbeatable.', avatar: 'P' },
    { name: 'Amit K.', review: 'Excellent customer support that helped me with my order query promptly. Highly recommended!', avatar: 'A' },
];

/**
 * Home Component - Redesigned
 * A more complete and professional landing page with a smaller hero slider and additional sections.
 */
const Home: React.FC = () => {
    const theme = useTheme();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [products, setProducts] = useState<HomeProduct[]>([]);

    // Fetch trending products
    useEffect(() => {
        ProductAPI.getProducts({ limit: 8 })
            .then(data => setProducts(data.products))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    // Hero carousel auto-play logic
    useEffect(() => {
        const timer = setInterval(() => setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1)), 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

    return (
        <Box sx={{ backgroundColor: theme.palette.grey[50] }}>
            {/* --- Hero Section (Smaller Height) --- */}
            <Box sx={{ position: 'relative', width: '100%', height: { xs: '50vh', md: '60vh' }, overflow: 'hidden' }}>
                {heroSlides.map((slide, index) => (
                    <Box key={index} sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: index === currentSlide ? 1 : 0, transition: 'opacity 1s ease-in-out' }}>
                        <Box sx={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', p: 2 }}>
                            <Typography variant="h3" component="h1" fontWeight="bold" sx={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>{slide.title}</Typography>
                            <Typography variant="h6" sx={{ mt: 2, textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}>{slide.subtitle}</Typography>
                            <Button component={RouterLink} to={slide.link} variant="contained" size="large" sx={{ mt: 4 }}>Shop Now</Button>
                        </Box>
                    </Box>
                ))}
                <IconButton onClick={prevSlide} sx={{ position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)', color: 'white', backgroundColor: 'rgba(0,0,0,0.3)', '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' } }}><FiChevronLeft /></IconButton>
                <IconButton onClick={nextSlide} sx={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', color: 'white', backgroundColor: 'rgba(0,0,0,0.3)', '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' } }}><FiChevronRight /></IconButton>
            </Box>

            {/* --- Featured Categories Section (New Circular Design) --- */}
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Typography variant="h4" component="h2" fontWeight="bold" textAlign="center" color="text.primary" gutterBottom>
                    Shop by Category
                </Typography>
                <Grid container spacing={3} sx={{ mt: 4, justifyContent: 'center' }}>
                    {categories.map((cat) => (
                        <Grid item key={cat.name} xs={3} sm={3} md={2}>
                            <Box
                                component={RouterLink}
                                to={cat.link}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textDecoration: 'none',
                                    color: 'text.primary',
                                    '&:hover': {
                                        '& .category-image': {
                                            transform: 'scale(1.1)',
                                            boxShadow: theme.shadows[6],
                                        },
                                        '& .category-name': {
                                            color: 'primary.main',
                                        }
                                    }
                                }}
                            >
                                <Avatar
                                    src={cat.image}
                                    alt={cat.name}
                                    className="category-image"
                                    sx={{
                                        width: { xs: 80, md: 120 },
                                        height: { xs: 80, md: 120 },
                                        mb: 2,
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        border: '3px solid',
                                        borderColor: 'grey.300'
                                    }}
                                />
                                <Typography
                                    variant="h6"
                                    component="h3"
                                    fontWeight="medium"
                                    className="category-name"
                                    sx={{ transition: 'color 0.3s ease' }}
                                >
                                    {cat.name}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* --- Trending Products Section --- */}
            <Paper elevation={0} sx={{ py: 6, backgroundColor: 'white' }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Typography variant="h4" component="h2" fontWeight="bold" color="text.primary">Trending Products</Typography>
                        <Button 
                            component={RouterLink} 
                            to="/products" 
                            variant="outlined" 
                            color="primary"
                            sx={{ borderRadius: '20px' }}
                        >
                            View All
                        </Button>
                    </Box>
                    <Grid container spacing={3}>
                        {products.map((product) => (
                            <Grid item key={product._id} xs={6} sm={6} md={4} lg={3}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Paper>

            {/* --- Why Choose Us Section --- */}
            <Box sx={{ py: 8, backgroundColor: '#f8f9fa' }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" component="h2" fontWeight="bold" textAlign="center" color="text.primary" gutterBottom>Why Choose BazaarBuddy?</Typography>
                    <Typography variant="subtitle1" textAlign="center" color="text.secondary" sx={{ mb: 5, maxWidth: '700px', mx: 'auto' }}>
                        We strive to provide the best shopping experience with quality products and exceptional service
                    </Typography>
                    <Grid container spacing={4} sx={{ textAlign: 'center' }}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} sx={{ p: 4, height: '100%', borderRadius: '16px', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-10px)' } }}>
                                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                                    <LocalShipping sx={{ fontSize: 56, color: 'primary.main' }} />
                                </Box>
                                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Fast Delivery</Typography>
                                <Typography color="text.secondary">Get your orders delivered to your doorstep in record time with our efficient logistics network.</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} sx={{ p: 4, height: '100%', borderRadius: '16px', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-10px)' } }}>
                                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                                    <HighQuality sx={{ fontSize: 56, color: 'primary.main' }} />
                                </Box>
                                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Quality Products</Typography>
                                <Typography color="text.secondary">Handpicked and quality-assured products from trusted sellers with satisfaction guarantee.</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} sx={{ p: 4, height: '100%', borderRadius: '16px', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-10px)' } }}>
                                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                                    <SupportAgent sx={{ fontSize: 56, color: 'primary.main' }} />
                                </Box>
                                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>24/7 Support</Typography>
                                <Typography color="text.secondary">Our dedicated support team is always here to help you with any queries or concerns.</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* --- Customer Testimonials Section --- */}
            <Paper elevation={0} sx={{ py: 6, backgroundColor: 'white' }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" component="h2" fontWeight="bold" textAlign="center" color="text.primary" gutterBottom>From Our Customers</Typography>
                    <Grid container spacing={3} sx={{ mt: 4 }}>
                        {testimonials.map((item) => (
                            <Grid item key={item.name} xs={12} md={4}>
                                <Card sx={{ height: '100%' }}><CardContent sx={{ textAlign: 'center' }}><Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, margin: 'auto' }}>{item.avatar}</Avatar><Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>"{item.review}"</Typography><Typography fontWeight="bold" sx={{ mt: 2 }}>- {item.name}</Typography></CardContent></Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Paper>

            {/* --- Promotional Banner --- */}
            <Box sx={{ backgroundColor: 'primary.dark', color: 'white', py: 8, px: 2, textAlign: 'center' }}>
                <Container maxWidth="md">
                    <Typography variant="h3" component="h2" fontWeight="bold">Flash Sale!</Typography>
                    <Typography variant="h6" component="p" sx={{ mt: 2, mb: 4 }}>Get up to <Typography component="span" variant="h6" fontWeight="bold" color="yellow.main">50% OFF</Typography> on selected items.</Typography>
                    <Button component={RouterLink} to="/" variant="contained" size="large" sx={{ backgroundColor: 'white', color: 'primary.dark', '&:hover': { backgroundColor: 'grey.200' } }}>View Deals</Button>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;