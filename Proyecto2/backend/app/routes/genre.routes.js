import express from 'express';
const router = express.Router();

import { 
    getAllGenres, 
    getGenreById, 
    createGenre, 
    updateGenre, 
    deleteGenre,
    getBooksByGenre 
} from '../controllers/genreController.js';

import protect from '../middleware/protectMiddleware.js';
import { admin } from '../middleware/roleMiddleware.js';

router.get('/', protect, getAllGenres);
router.get('/:id', protect, getGenreById);
router.post('/', protect, admin, createGenre);
router.put('/:id', protect, admin, updateGenre);
router.delete('/:id', protect, admin, deleteGenre);
router.get('/:id/books', protect, getBooksByGenre); // Route to get books by genre

export default router;
