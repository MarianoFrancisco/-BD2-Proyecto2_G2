/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import express from 'express';
const router = express.Router();

import protect from '../middleware/verifyToken.js';
import {
    getBooks,
    addBook,
    updateBook,
    deleteBook,
    searchBooks
} from '../controllers/bookController.js';

router.get('', protect, getBooks);

router.get('/search', protect, searchBooks);

router.post('', protect, addBook);

router.put('/:id', protect, updateBook);

router.delete('/:id', protect, deleteBook);

export default router;