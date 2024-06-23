/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import express from 'express';
const router = express.Router();

import protect from '../middleware/protectMiddleware.js';
import {
    getBooks,
    addBook,
    updateBook,
    deleteBook,
    searchBooks,
} from '../controllers/bookController.js';
import { admin } from '../middleware/roleMiddleware.js';

router.get('', protect, getBooks);

router.get('', protect, getBooks);

router.get('/search', protect, searchBooks);

router.post('', protect, admin, addBook);

router.put('/:id', protect, admin, updateBook);

router.delete('/:id', protect, admin, deleteBook);

export default router;