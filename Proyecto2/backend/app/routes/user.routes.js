/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import express from 'express';
const router = express.Router();

import protect from '../middleware/protectMiddleware.js';
import { getUserById, updateUserById } from '../controllers/userController.js';

router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUserById);

export default router;