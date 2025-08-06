import User from '../models/User.js';

// @desc    Get user membership details
// @route   GET /api/membership/:email
// @access  Public
export const getMembershipDetails = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
            .select('membership bookingHistory')
            .populate('bookingHistory');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: {
                membership: user.membership,
                bookingHistory: user.bookingHistory
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Activate membership
// @route   POST /api/membership/activate
// @access  Public
export const activateMembership = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if user already has active membership
        if (user.membership.status === 'active') {
            return res.status(400).json({
                success: false,
                message: 'User already has an active membership'
            });
        }

        // Activate membership
        user.membership.status = 'active';
        user.membership.joinDate = new Date();
        user.membership.expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year from now
        user.membership.voucherNumber = 'VCH-' + Math.random().toString(36).substring(2, 10).toUpperCase();

        await user.save();

        res.json({
            success: true,
            data: user.membership,
            message: 'Membership activated successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Check membership status
// @route   GET /api/membership/status/:email
// @access  Public
export const checkMembershipStatus = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
            .select('membership');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if membership has expired
        if (user.membership.status === 'active' && user.membership.expiryDate < new Date()) {
            user.membership.status = 'expired';
            await user.save();
        }

        res.json({
            success: true,
            data: user.membership
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}; 