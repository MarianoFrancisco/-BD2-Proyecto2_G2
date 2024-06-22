/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import express from 'express';
const router = express.Router();

import {
    getBooks,
    addBook,
    updateBook,
    deleteBook,
    searchBooks
} from '../controllers/booksController.js';

router.get('', getBooks);

router.get('/search', searchBooks);

router.post('', addBook);

router.put('/:id', updateBook);

router.delete('/:id', deleteBook);

export default router;