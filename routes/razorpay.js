const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');

// Import auth middleware directly
const authRouter = require('./auth');
const verifyToken = authRouter.verifyToken;

// Initialize Razorpay with environment variables
// This ensures credentials are not hardcoded
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a new Razorpay order
// Protected with verifyToken middleware
router.post('/', verifyToken, async (req, res) => {
  const { amount } = req.body;
  
  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Valid amount is required' });
  }

  const options = {
    amount: Math.round(amount * 100), // amount in paise (smallest currency unit)
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1 // Auto-capture payment
  };

  try {
    const order = await razorpay.orders.create(options);
    
    // Only return necessary information to the frontend
    // No sensitive credentials are exposed
    res.json({ 
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency
      } 
    });
  } catch (error) {
    console.error('Razorpay order error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Verify payment signature
router.post('/verify', verifyToken, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: 'All payment verification parameters are required' });
  }

  const shasum = require('crypto').createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest('hex');
  
  if (digest === razorpay_signature) {
    res.json({ success: true, message: 'Payment verified successfully' });
  } else {
    res.status(400).json({ success: false, error: 'Payment verification failed' });
  }
});

module.exports = router;
