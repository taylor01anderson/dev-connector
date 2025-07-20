const express = require ('express');
const router = express.Router();

// @route   GET api/auth
// @desc    Test users route

router.get('/', (req, res) => {
  res.send('Auth API Running');
});

module.exports = router;