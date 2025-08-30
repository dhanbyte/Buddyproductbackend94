// src/Components/Cart.tsx
import React from 'react';
import CartItem from './CartItem';
import PriceSummary from './PriceSummary';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../data/CartContext';
import { Container, Typography, Box, Grid, Button, Paper } from '@mui/material';
import { FiShoppingCart } from 'react-icons/fi';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (id: string, delta: number) => updateQuantity(id, delta);
  const handleRemove = (id: string) => removeFromCart(id);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <FiShoppingCart size={64} style={{ color: '#bdbdbd' }} />
        <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
          Your Cart is Empty
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Looks like you haven't added anything to your cart yet.
        </Typography>
        <Button component={RouterLink} to="/" variant="contained" size="large">
          Start Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Your Cart
      </Typography>
      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
            ))}
          </Box>
        </Grid>
        {/* Price Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, position: 'sticky', top: 100 }}>
            <PriceSummary subtotal={subtotal} discount={50} delivery={30} />
            <Button
              component={RouterLink}
              to="/checkout"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;