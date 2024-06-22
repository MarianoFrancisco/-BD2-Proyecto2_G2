/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import express from 'express';
const router = express.Router();

import { getAuthors, addAuthor, deleteAuthor } from '../controllers/authorController.js';

router.get('', getAuthors);

router.post('', addAuthor);

router.delete('/:id', deleteAuthor);

export default router;