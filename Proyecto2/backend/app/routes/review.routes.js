/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import express from 'express';
const router = express.Router();

import protect from '../middleware/protectMiddleware.js';
import { getReviewsByBookId, addReview } from '../controllers/reviewController.js';
import { client } from '../middleware/roleMiddleware.js';

router.get('/book', protect, client, getReviewsByBookId);

router.post('', protect, client, addReview);

export default router;