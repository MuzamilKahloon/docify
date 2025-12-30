const Query = require('../models/Query');

// @desc    Create new query/conversation
// @route   POST /queries
exports.createQuery = async (req, res) => {
  const { subject, message, priority } = req.body;
  try {
    const query = new Query({
      user: req.user._id,
      subject,
      priority: priority || 'Medium',
      messages: [{
        sender: req.user._id,
        text: message,
        isAdmin: false
      }],
      lastMessageAt: Date.now()
    });

    const savedQuery = await query.save();
    res.status(201).json(savedQuery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user's queries
// @route   GET /queries/my-queries
exports.getUserQueries = async (req, res) => {
  try {
    const queries = await Query.find({ user: req.user._id }).sort('-lastMessageAt');
    res.json(queries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add message to conversation
// @route   POST /queries/:id/message
exports.addMessage = async (req, res) => {
  const { text } = req.body;
  try {
    const query = await Query.findById(req.params.id);
    if (!query) return res.status(404).json({ message: 'Conversation not found' });

    // Verify user owns query or is admin
    if (query.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    query.messages.push({
      sender: req.user._id,
      text,
      isAdmin: req.user.isAdmin
    });

    query.lastMessageAt = Date.now();

    // If admin replies, we can keep it pending or mark as something else? 
    // Usually stay pending until solved by admin

    await query.save();
    res.json(query);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single query thread
// @route   GET /queries/:id
exports.getQueryById = async (req, res) => {
  try {
    const query = await Query.findById(req.params.id).populate('user', 'name email');
    if (!query) return res.status(404).json({ message: 'Query not found' });

    if (query.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(query);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
