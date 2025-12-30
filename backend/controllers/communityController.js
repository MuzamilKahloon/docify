const CommunityMessage = require('../models/CommunityMessage');

// @desc    Get community message history
// @route   GET /community/history
exports.getHistory = async (req, res) => {
  try {
    const messages = await CommunityMessage.find()
      .populate('sender', 'displayName username photoURL')
      .sort({ createdAt: -1 })
      .limit(50);

    // Reverse to show in chronological order
    res.json(messages.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
