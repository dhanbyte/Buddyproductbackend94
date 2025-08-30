// src/Components/CartItem.tsx
import React from 'react';
import { toast } from "react-toastify";
import { Box, Paper, Typography, IconButton, ButtonGroup, Button, Grid } from '@mui/material';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';

type CartItemProps = {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    brand: string;
    image: string;
  };
  onQuantityChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
};

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  const handleRemoveClick = () => {
    onRemove(item.id);
    toast.error(`${item.name} removed from cart`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  return (
    <Paper elevation={2} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Grid container alignItems="center" spacing={2}>
        {/* Image */}
        <Grid item xs={12} sm={2}>
          <Box
            component="img"
            src={item.image}
            alt={item.name}
            sx={{ width: '100%', height: 'auto', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 1 }}
          />
        </Grid>
        {/* Name and Brand */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" component="div">{item.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Sold by <Typography component="span" color="primary">{item.brand}</Typography>
          </Typography>
        </Grid>
        {/* Quantity Control */}
        <Grid item xs={6} sm={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ButtonGroup size="small" variant="outlined">
            <Button onClick={() => onQuantityChange(item.id, -1)}><FiMinus /></Button>
            <Button disabled sx={{ '&.Mui-disabled': { color: 'text.primary' } }}>{item.quantity}</Button>
            <Button onClick={() => onQuantityChange(item.id, 1)}><FiPlus /></Button>
          </ButtonGroup>
        </Grid>
        {/* Price and Remove */}
        <Grid item xs={6} sm={3} sx={{ textAlign: 'right' }}>
          <Typography variant="h6" fontWeight="bold">₹{(item.price * item.quantity).toFixed(2)}</Typography>
          <IconButton color="error" onClick={handleRemoveClick} sx={{ mt: 1 }}>
            <FiTrash2 />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartItem;
