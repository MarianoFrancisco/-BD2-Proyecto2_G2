/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import express from 'express';
const router = express.Router();

import protect from '../middleware/verifyToken.js';
import { updateUserById } from '../controllers/userController.js';

router.put('/:id', protect, updateUserById);

export default router;