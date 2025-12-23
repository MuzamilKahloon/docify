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

// @desc    Get all queries
// @route   GET /admin/queries
exports.getQueries = async (req, res) => {
  try {
    const queries = await Query.find({}).sort('-createdAt');
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
