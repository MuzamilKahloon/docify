const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, getQueries, resolveQuery } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect);
router.use(admin);

router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.get('/queries', getQueries);
router.put('/queries/:id/resolve', resolveQuery);

module.exports = router;
