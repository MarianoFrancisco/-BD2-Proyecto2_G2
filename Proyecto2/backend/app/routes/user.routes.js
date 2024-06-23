/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import express from 'express';
const router = express.Router();

import protect from '../middleware/protectMiddleware.js';
import { getUser, updateUser } from '../controllers/userController.js';

router.get('', protect, getUser);
router.put('', protect, updateUser);

export default router;