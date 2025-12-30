const express = require('express');
const router = express.Router();
const {
  getProfileByUsername,
  getMyProfile,
  updateProfile,
  uploadCv,
  deleteCv,
  uploadProfilePicture,
  incrementCvDownload
} = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

// Get multer upload from app settings
const getUpload = (req) => req.app.get('upload');

// Protected routes (Placed first to avoid shadowing by public routes)
router.get('/me', protect, getMyProfile);
router.put('/me', protect, updateProfile);

// Public routes
router.get('/:username', getProfileByUsername);
router.post('/:username/cv-download', incrementCvDownload);

// File upload routes
router.post('/me/cv', protect, (req, res, next) => {
  const upload = getUpload(req);
  upload.single('cv')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, uploadCv);

router.delete('/me/cv', protect, deleteCv);

router.post('/me/picture', protect, (req, res, next) => {
  const upload = getUpload(req);
  upload.single('profilePicture')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, uploadProfilePicture);

module.exports = router;
