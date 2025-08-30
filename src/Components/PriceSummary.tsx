// src/Components/PriceSummary.tsx
import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider, Box, TextField, Button } from '@mui/material';

type PriceSummaryProps = {
  subtotal: number;
  discount: number;
  delivery: number;
};

const PriceSummary: React.FC<PriceSummaryProps> = ({ subtotal, discount, delivery }) => {
  const total = subtotal - discount + delivery;

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Price Summary
      </Typography>
      <List dense>
        <ListItem disableGutters>
          <ListItemText primary="Subtotal" />
          <Typography variant="body1">₹{subtotal.toFixed(2)}</Typography>
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="Discount" />
          <Typography variant="body1" color="green">-₹{discount.toFixed(2)}</Typography>
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="Delivery Charges" />
          <Typography variant="body1">₹{delivery.toFixed(2)}</Typography>
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" component="div" fontWeight="bold">
          Total
        </Typography>
        <Typography variant="h6" component="div" fontWeight="bold">
          ₹{total.toFixed(2)}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <TextField size="small" label="Promo Code" fullWidth />
        <Button variant="contained">Apply</Button>
      </Box>
    </Paper>
  );
};

export default PriceSummary;
