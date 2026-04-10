const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/moodController');
const { protect } = require('../middleware/authMiddleware');

// Protect this route so only logged-in users can get recommendations
router.post('/recommend', protect, getRecommendations);

module.exports = router;