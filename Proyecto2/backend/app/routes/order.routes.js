/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import express from 'express';
const router = express.Router();

import protect from '../middleware/protectMiddleware.js';
import { getOrders, getTopBooks, searchOrder, addOrder, updateOrderStatus } from '../controllers/orderController.js';
import { admin } from '../middleware/roleMiddleware.js';

router.get('', protect, getOrders);

router.get('/top', protect, admin, getTopBooks);

router.get('/search', protect, searchOrder);

router.post('', protect, addOrder);

router.patch('/:id', protect, updateOrderStatus);

export default router;