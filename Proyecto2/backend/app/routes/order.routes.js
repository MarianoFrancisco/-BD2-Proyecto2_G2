/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import express from 'express';
const router = express.Router();

import protect from '../middleware/verifyToken.js';
import { getOrder, searchOrder, addOrder, updateOrderStatus } from '../controllers/orderController.js';

router.get('', protect, getOrder);

router.get('/search', protect, searchOrder);

router.post('', protect, addOrder);

router.patch('/:id', protect, updateOrderStatus);

export default router;