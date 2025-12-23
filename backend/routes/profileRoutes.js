const express = require('express');
const router = express.Router();
const { getProfileByUsername, getMyProfile, updateProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

router.get('/me', protect, getMyProfile);
router.put('/me', protect, updateProfile);
router.get('/:username', getProfileByUsername);

module.exports = router;
