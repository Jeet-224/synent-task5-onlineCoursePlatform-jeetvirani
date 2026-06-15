const express = require('express');
const router = express.Router();
const { getAllCourses, getCourseById, getCourseReviews, addReview, getCategories, seedCourses } = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllCourses);
router.get('/categories', getCategories);
router.post('/seed', protect, seedCourses); // dev only
router.get('/:id', getCourseById);
router.get('/:id/reviews', getCourseReviews);
router.post('/:id/reviews', protect, addReview);

module.exports = router;
