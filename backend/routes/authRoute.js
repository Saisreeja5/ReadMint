import express from 'express';
import googleAuthController from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/google
router.post('/google', googleAuthController);

export default router;
