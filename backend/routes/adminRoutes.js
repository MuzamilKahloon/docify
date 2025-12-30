const express = require('express');
const router = express.Router();
const {
  getUsers,
  deleteUser,
  getQueries,
  resolveQuery,
  blockUser,
  unblockUser,
  suspendUser
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect);
router.use(admin);

router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/block', blockUser);
router.put('/users/:id/unblock', unblockUser);
router.put('/users/:id/suspend', suspendUser);
router.get('/queries', getQueries);
router.put('/queries/:id/resolve', resolveQuery);

module.exports = router;
