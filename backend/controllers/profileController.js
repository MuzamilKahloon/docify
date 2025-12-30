const Profile = require('../models/Profile');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

// Helper function to get or create profile
const getOrCreateProfile = async (userId) => {
  let profile = await Profile.findOne({ user: userId });
  if (!profile) {
    const user = await User.findById(userId);
    const username = user.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    profile = new Profile({
      user: userId,
      username: username,
      bio: '',
      skills: [],
      education: [],
      experience: [],
      projects: [],
      profilePicture: '',
      cv: { url: '', fileName: '' },
      socialLinks: {
        linkedin: '',
        github: '',
        twitter: '',
        website: ''
      },
      stats: {
        profileViews: 0,
        cvDownloads: 0,
        lastUpdated: Date.now()
      }
    });
    await profile.save();
  }
  return profile;
};

// @desc    Get profile by username
// @route   GET /profiles/:username
exports.getProfileByUsername = async (req, res) => {
  try {
    const profile = await Profile.findOne({ username: req.params.username }).populate('user', 'name email');
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Increment profile views
    profile.stats.profileViews += 1;
    await profile.save();

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /profiles/me
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await getOrCreateProfile(req.user._id);
    const user = await User.findById(req.user._id).select('name email');

    res.json({
      ...profile.toObject(),
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create or update profile
// @route   PUT /profiles/me
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, bio, skills, education, experience, projects, profilePicture, username, socialLinks } = req.body;

    if (name || email) {
      const userUpdate = {};
      if (name) userUpdate.name = name;
      if (email) userUpdate.email = email;
      await User.findByIdAndUpdate(req.user._id, userUpdate);
    }

    const profileFields = {
      bio: bio || '',
      skills: skills || [],
      education: education || [],
      experience: experience || [],
      projects: projects || [],
      profilePicture: profilePicture || '',
      socialLinks: socialLinks || {
        linkedin: '',
        github: '',
        twitter: '',
        website: ''
      },
      'stats.lastUpdated': Date.now(),
      updatedAt: Date.now()
    };

    if (username) {
      profileFields.username = username;
    }

    let profile = await getOrCreateProfile(req.user._id);
    profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: profileFields },
      { new: true }
    );

    const user = await User.findById(req.user._id).select('name email');
    res.json({
      ...profile.toObject(),
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload CV
// @route   POST /profiles/me/cv
exports.uploadCv = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const profile = await getOrCreateProfile(req.user._id);

    if (profile.cv && profile.cv.url) {
      const oldFilePath = path.join(__dirname, '..', profile.cv.url.replace(/^\//, ''));
      if (fs.existsSync(oldFilePath)) {
        try { fs.unlinkSync(oldFilePath); } catch (e) { console.error("Error deleting old file:", e); }
      }
    }

    const cvUrl = `/uploads/${req.file.filename}`;
    profile.cv = {
      url: cvUrl,
      fileName: req.file.originalname,
      uploadedAt: Date.now()
    };
    profile.stats.lastUpdated = Date.now();
    profile.updatedAt = Date.now();

    await profile.save();

    res.json({
      message: 'CV uploaded successfully',
      cv: profile.cv,
      fullUrl: `${req.protocol}://${req.get('host')}${cvUrl}`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete CV
// @route   DELETE /profiles/me/cv
exports.deleteCv = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) return res.json({ message: 'No profile to delete CV from' });

    if (profile.cv && profile.cv.url) {
      const filePath = path.join(__dirname, '..', profile.cv.url.replace(/^\//, ''));
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch (e) { console.error("Error deleting file:", e); }
      }
    }

    profile.cv = { url: '', fileName: '', uploadedAt: null };
    profile.stats.lastUpdated = Date.now();
    profile.updatedAt = Date.now();

    await profile.save();
    res.json({ message: 'CV deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload profile picture
// @route   POST /profiles/me/picture
exports.uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const profile = await getOrCreateProfile(req.user._id);

    if (profile.profilePicture && profile.profilePicture.startsWith('/uploads')) {
      const oldFilePath = path.join(__dirname, '..', profile.profilePicture.replace(/^\//, ''));
      if (fs.existsSync(oldFilePath)) {
        try { fs.unlinkSync(oldFilePath); } catch (e) { console.error("Error deleting old file:", e); }
      }
    }

    const pictureUrl = `/uploads/${req.file.filename}`;
    profile.profilePicture = pictureUrl;
    profile.stats.lastUpdated = Date.now();
    profile.updatedAt = Date.now();

    await profile.save();

    res.json({
      message: 'Profile picture uploaded successfully',
      profilePicture: pictureUrl,
      fullUrl: `${req.protocol}://${req.get('host')}${pictureUrl}`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Increment CV downloads
// @route   POST /profiles/:username/cv-download
exports.incrementCvDownload = async (req, res) => {
  try {
    const profile = await Profile.findOne({ username: req.params.username });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    profile.stats.cvDownloads += 1;
    await profile.save();

    res.json({ message: 'Download counted', cvDownloads: profile.stats.cvDownloads });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
