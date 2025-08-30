// Import necessary libraries and components
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useCart } from '../data/CartContext';
import { useNavigate } from 'react-router-dom';
import { UserAPI, OrderAPI } from '../lib/api';

// Import Material-UI components
import {
    Container, Typography, Button, Box, Grid, Paper, Stepper, Step, StepLabel, CircularProgress, 
    TextField, RadioGroup, FormControlLabel, Radio, List, ListItem, ListItemText, Divider, Alert
} from '@mui/material';

// --- Type Definitions ---
interface Address {
    label: string; address: string; city: string; state: string; pin: string; phone: string;
}
interface UserProfile {
    name: string;
    email: string;
    addresses: Address[];
}

// Steps for the checkout process
const steps = ['Shipping Address', 'Payment Method', 'Confirm Order'];

/**
 * CheckoutPage Component
 * Guides the user through a multi-step checkout process including shipping, payment, and confirmation.
 */
const CheckoutPage: React.FC = () => {
    // --- Hooks & State ---
    const { cart, clearCart } = useCart();
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Shipping state
    const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(0);
    const [showNewAddressForm, setShowNewAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState({ label: 'Home', address: '', city: '', state: '', pin: '', phone: '' });

    // Payment state
    const [paymentMethod, setPaymentMethod] = useState('COD');

    // --- Data Fetching ---
    const fetchUserProfile = useCallback(async () => {
        setLoading(true);
        try {
            const token = await getToken();
            const data = await UserAPI.getProfile(token);
            setUserProfile(data);
            if (data.addresses.length > 0) {
                setSelectedAddressIndex(0);
            } else {
                setShowNewAddressForm(true); // If no addresses, show form by default
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [getToken]);

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    // --- Event Handlers ---
    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleAddNewAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const token = await getToken();
            await UserAPI.addAddress(newAddress, token);
            setShowNewAddressForm(false);
            fetchUserProfile(); // Refresh profile to get new address
        } catch (err) {
            setError('Failed to save address. Please check the details and try again.');
        }
    };

    const handlePlaceOrder = async () => {
        if (selectedAddressIndex === null) {
            setError('Please select a shipping address.');
            return;
        }
        setLoading(true);
        setError(null);
        const affiliateRef = localStorage.getItem('affiliateRef');

        try {
            const token = await getToken();
            const orderData = await OrderAPI.placeOrder({
                items: cart.map(item => ({ product: item.id, quantity: item.quantity })),
                addressIndex: selectedAddressIndex,
                paymentMethod,
                affiliateId: affiliateRef,
            }, token);
            clearCart();
            localStorage.removeItem('affiliateRef');
            navigate('/order-confirmation', { state: { orderId: orderData._id } });
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    // --- Step Content Components ---

    const ShippingStep = () => (
        <Box>
            <Typography variant="h6" gutterBottom>Select Shipping Address</Typography>
            <RadioGroup value={selectedAddressIndex} onChange={(e) => setSelectedAddressIndex(Number(e.target.value))}>
                {userProfile?.addresses.map((addr, index) => (
                    <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2, cursor: 'pointer', borderColor: selectedAddressIndex === index ? 'primary.main' : undefined }}>
                        <FormControlLabel value={index} control={<Radio />} label={
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">{addr.label}</Typography>
                                <Typography variant="body2">{addr.address}, {addr.city}, {addr.state} - {addr.pin}</Typography>
                                <Typography variant="body2" color="text.secondary">Phone: {addr.phone}</Typography>
                            </Box>
                        } />
                    </Paper>
                ))}
            </RadioGroup>
            <Button onClick={() => setShowNewAddressForm(!showNewAddressForm)} sx={{ mt: 2 }}>
                {showNewAddressForm ? 'Cancel' : '+ Add New Address'}
            </Button>
            {showNewAddressForm && (
                <Box component="form" onSubmit={handleAddNewAddress} sx={{ mt: 2, p: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}><TextField label="Address Label (e.g., Home, Work)" name="label" onChange={(e) => setNewAddress({...newAddress, label: e.target.value})} fullWidth required /></Grid>
                        <Grid item xs={12}><TextField label="Address" name="address" onChange={(e) => setNewAddress({...newAddress, address: e.target.value})} fullWidth required /></Grid>
                        <Grid item xs={12} sm={6}><TextField label="City" name="city" onChange={(e) => setNewAddress({...newAddress, city: e.target.value})} fullWidth required /></Grid>
                        <Grid item xs={12} sm={6}><TextField label="State" name="state" onChange={(e) => setNewAddress({...newAddress, state: e.target.value})} fullWidth required /></Grid>
                        <Grid item xs={12} sm={6}><TextField label="PIN Code" name="pin" onChange={(e) => setNewAddress({...newAddress, pin: e.target.value})} fullWidth required /></Grid>
                        <Grid item xs={12} sm={6}><TextField label="Phone Number" name="phone" onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})} fullWidth required /></Grid>
                    </Grid>
                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save Address</Button>
                </Box>
            )}
        </Box>
    );

    const PaymentStep = () => (
        <Box>
            <Typography variant="h6" gutterBottom>Select Payment Method</Typography>
            <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                    <FormControlLabel value="COD" control={<Radio />} label="Cash on Delivery" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>Pay with cash upon delivery.</Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 2, opacity: 0.6, cursor: 'not-allowed' }}>
                    <FormControlLabel value="UPI" control={<Radio />} label="UPI / Online Payment" disabled />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>Pay with UPI, Credit/Debit Card. (Coming Soon)</Typography>
                </Paper>
            </RadioGroup>
        </Box>
    );

    const ConfirmationStep = () => {
        const address = userProfile?.addresses[selectedAddressIndex!];
        if (!address) return <Alert severity="warning">Please go back and select a shipping address.</Alert>;
        return (
            <Box>
                <Typography variant="h6" gutterBottom>Confirm Your Order</Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" fontWeight="bold">Shipping To:</Typography>
                            <Typography>{userProfile?.name}</Typography>
                            <Typography>{address.address}, {address.city}</Typography>
                            <Typography>{address.state} - {address.pin}</Typography>
                            <Typography>Phone: {address.phone}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" fontWeight="bold">Payment Method:</Typography>
                            <Typography>{paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online'}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        );
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0: return <ShippingStep />;
            case 1: return <PaymentStep />;
            case 2: return <ConfirmationStep />;
            default: throw new Error('Unknown step');
        }
    };

    // --- Render Logic ---
    if (loading || !userProfile) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}><CircularProgress /></Box>;
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>Checkout</Typography>
            <Grid container spacing={4}>
                {/* Left Side: Stepper and Step Content */}
                <Grid item xs={12} md={8}>
                    <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                        {steps.map((label) => (
                            <Step key={label}><StepLabel>{label}</StepLabel></Step>
                        ))}
                    </Stepper>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {getStepContent(activeStep)}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                        <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                        {activeStep === steps.length - 1 ? (
                            <Button variant="contained" color="primary" onClick={handlePlaceOrder} disabled={cart.length === 0}>
                                Place Order
                            </Button>
                        ) : (
                            <Button variant="contained" onClick={handleNext} disabled={selectedAddressIndex === null}>
                                Next
                            </Button>
                        )}
                    </Box>
                </Grid>

                {/* Right Side: Order Summary */}
                <Grid item xs={12} md={4}>
                    <Paper variant="outlined" sx={{ p: 2, position: 'sticky', top: 100 }}>
                        <Typography variant="h6" gutterBottom>Order Summary</Typography>
                        <List disablePadding>
                            {cart.map(item => (
                                <ListItem key={item.id} disableGutters>
                                    <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
                                    <Typography variant="body2">₹{(item.price * item.quantity).toFixed(2)}</Typography>
                                </ListItem>
                            ))}
                            <Divider sx={{ my: 2 }} />
                            <ListItem disableGutters>
                                <ListItemText primary={<Typography fontWeight="bold">Total</Typography>} />
                                <Typography variant="h6" fontWeight="bold">₹{subtotal.toFixed(2)}</Typography>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CheckoutPage;
