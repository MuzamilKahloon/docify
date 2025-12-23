const Profile = require('../models/Profile');

// @desc    Get profile by username
// @route   GET /profiles/:username
exports.getProfileByUsername = async (req, res) => {
  try {
    const profile = await Profile.findOne({ username: req.params.username }).populate('user', 'name email');
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /profiles/me
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create or update profile
// @route   PUT /profiles/me
exports.updateProfile = async (req, res) => {
  const profileFields = {
    user: req.user._id,
    ...req.body,
    updatedAt: Date.now()
  };

  try {
    let profile = await Profile.findOne({ user: req.user._id });

    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
