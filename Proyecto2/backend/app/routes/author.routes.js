/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import express from 'express';
const router = express.Router();

import protect from '../middleware/protectMiddleware.js';
import { getAuthors, addAuthor, deleteAuthor } from '../controllers/authorController.js';
import { admin } from '../middleware/roleMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

router.get('', protect, getAuthors);

router.post('', protect, admin, upload.single('imagen'), addAuthor);

router.delete('/:id', protect, admin, deleteAuthor);

export default router;