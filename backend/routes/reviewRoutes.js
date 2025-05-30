import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import reviewController from '../controllers/reviewController.js';

const router = express.Router();



router.post('/:id', authMiddleware, reviewController.addReviewController);
router.get('/:id', reviewController.getReviewsController);
router.post('/delete/:id',authMiddleware,reviewController.deleteReviewController);
export default router;