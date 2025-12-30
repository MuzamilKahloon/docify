const express = require('express');
const router = express.Router();
const { getHistory } = require('../controllers/communityController');
const { protect } = require('../middleware/authMiddleware');

router.get('/history', protect, getHistory);

module.exports = router;
