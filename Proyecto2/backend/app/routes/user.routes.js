/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import express from 'express';
const router = express.Router();

import protect from '../middleware/protectMiddleware.js';
import { getUser, updatePassword, updateUser } from '../controllers/userController.js';

router.get('', protect, getUser);
router.patch('/info', protect, updateUser);
router.patch('/pwd', protect, updatePassword);

export default router;