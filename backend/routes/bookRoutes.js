import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import uploadBookController from '../controllers/uploadBookController.js';
import getAllBooksController from '../controllers/getAllBooksController.js';


const router = express.Router();

// POST api/books
router.post('/', authMiddleware, uploadBookController);
router.get('/', getAllBooksController);




export default router;