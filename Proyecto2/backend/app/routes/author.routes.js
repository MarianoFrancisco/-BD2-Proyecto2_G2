/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import express from 'express';
const router = express.Router();

import protect from '../middleware/verifyToken.js';
import { getAuthors, addAuthor, deleteAuthor } from '../controllers/authorController.js';

router.get('', protect, getAuthors);

router.post('', protect, addAuthor);

router.delete('/:id', protect, deleteAuthor);

export default router;