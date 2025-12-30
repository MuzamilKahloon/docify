const User = require('../models/User');
const Query = require('../models/Query');

// @desc    Get all users
// @route   GET /admin/users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /admin/users/:id
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Block user
// @route   PUT /admin/users/:id/block
exports.blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.isAdmin) {
        return res.status(400).json({ message: 'Cannot block an admin' });
      }
      user.isBlocked = true;
      await user.save();
      res.json({ message: 'User blocked' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Unblock user
// @route   PUT /admin/users/:id/unblock
exports.unblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.isBlocked = false;
      await user.save();
      res.json({ message: 'User unblocked' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Suspend user
// @route   PUT /admin/users/:id/suspend
exports.suspendUser = async (req, res) => {
  const { duration, reason } = req.body; // duration in minutes
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.isAdmin) {
        return res.status(400).json({ message: 'Cannot suspend an admin' });
      }
      const suspendedUntil = new Date();
      suspendedUntil.setMinutes(suspendedUntil.getMinutes() + parseInt(duration));

      user.suspendedUntil = suspendedUntil;
      user.suspensionReason = reason || 'No reason provided';
      await user.save();
      res.json({ message: 'User suspended', suspendedUntil });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all queries
// @route   GET /admin/queries
exports.getQueries = async (req, res) => {
  try {
    const queries = await Query.find({})
      .populate('user', 'name email createdAt')
      .sort('-lastMessageAt');
    res.json(queries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Resolve query
// @route   PUT /admin/queries/:id/resolve
exports.resolveQuery = async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    if (query) {
      query.status = 'Solved';
      const updatedQuery = await query.save();
      res.json(updatedQuery);
    } else {
      res.status(404).json({ message: 'Query not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
