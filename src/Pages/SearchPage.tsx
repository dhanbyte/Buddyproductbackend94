// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';
import { SearchAPI } from '../lib/api';
import { ENDPOINTS, getApiUrl } from '../lib/api-endpoints';

// Import Material-UI components
import {
    Container,
    Typography,
    Grid,
    Box,
    CircularProgress,
    Alert
} from '@mui/material';

// Define the shape of the product object
interface Product {
    _id: string;
    name: string;
    category: string;
    price: { original: number };
    image: string;
}

/**
 * SearchPage Component
 * Displays the results of a user's search query.
 * Fetches products from the API based on the 'q' URL parameter.
 */
const SearchPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Effect to fetch search results when the query parameter changes
    useEffect(() => {
        // If there's no query, don't search
        if (!query) {
            setResults([]);
            setLoading(false);
            return;
        }

        const fetchSearchResults = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await SearchAPI.searchProducts(query);
                setResults(data.products || []);
            } catch (err: any) {
                console.error(err);
                setResults([]);
                setError(err.message || 'An error occurred during the search.');
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {query ? (
                <Typography variant="h4" component="h1" gutterBottom>
                    Search Results for: 
                    <Typography component="span" variant="h4" color="primary">
                        &nbsp;"{query}"
                    </Typography>
                </Typography>
            ) : (
                <Typography variant="h4" component="h1" gutterBottom>
                    Please enter a search term.
                </Typography>
            )}

            {/* Show a loading spinner while fetching data */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                // Show an error message if the fetch failed
                <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>
            ) : results.length > 0 ? (
                // If there are results, display them in a grid
                <Grid container spacing={3} sx={{ mt: 2 }}>
                    {results.map((product) => (
                        <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                // If there are no results, show a message
                <Box sx={{ textAlign: 'center', py: 10 }}>
                    <Typography variant="h6" paragraph>
                        No products found matching your search.
                    </Typography>
                    <Typography color="text.secondary">
                        Try searching for something else.
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default SearchPage;