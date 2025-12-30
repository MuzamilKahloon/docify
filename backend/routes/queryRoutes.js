const express = require('express');
const router = express.Router();
const { createQuery, getUserQueries, addMessage, getQueryById } = require('../controllers/queryController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createQuery);
router.get('/my-queries', protect, getUserQueries);
router.get('/:id', protect, getQueryById);
router.post('/:id/message', protect, addMessage);

module.exports = router;
