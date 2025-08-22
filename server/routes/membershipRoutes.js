import express from 'express';
import { 
    getMembershipDetails, 
    activateMembership, 
    checkMembershipStatus 
} from '../controllers/membershipController.js';

const router = express.Router();

// Public routes - no authentication required
router.get('/:email', getMembershipDetails);
router.post('/activate', activateMembership);
router.get('/status/:email', checkMembershipStatus);

export default router; 