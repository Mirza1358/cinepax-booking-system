import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// Test route to verify user routes are working
router.get('/test', (req, res) => {
    console.log('User routes test endpoint hit');
    res.json({ message: 'User routes are working!' });
});

// Public routes
router.post('/register', async (req, res) => {
    try {
        console.log('\n=== New User Registration Attempt ===');
        console.log('Time:', new Date().toISOString());
        console.log('Request Body:', JSON.stringify(req.body, null, 2));

        // Validate required fields
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            console.log('Missing required fields');
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists with email:', email);
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        // Generate voucher number
        const voucherNumber = Math.random().toString(36).substring(2, 10).toUpperCase();
        
        // Set membership dates
        const joinDate = new Date();
        const expiryDate = new Date();
        expiryDate.setDate(joinDate.getDate() + 365); // Valid for 1 year

        // Create user with all fields
        const userData = {
            name,
            email,
            password,
            membership: {
                status: 'active',
                points: 0,
                joinDate,
                expiryDate,
                voucherNumber
            }
        };

        console.log('Attempting to create user with data:', JSON.stringify(userData, null, 2));

        const user = await User.create(userData);

        console.log('User created successfully:', user._id);
        console.log('Membership Status:', user.membership.status);
        console.log('Voucher Number:', user.membership.voucherNumber);
        console.log('=== Registration Complete ===\n');

        res.status(201).json({
            success: true,
            data: {
                name: user.name,
                email: user.email,
                membership: user.membership
            },
            message: 'Registration successful!'
        });
    } catch (error) {
        console.error('ERROR in registration:', error);
        console.error('Full error object:', error);
        console.error('Error stack:', error.stack);
        res.status(400).json({
            success: false,
            message: error.message,
            error: error
        });
    }
});

router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

console.log('User routes initialized');

export default router; 