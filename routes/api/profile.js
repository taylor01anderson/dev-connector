const express = require ('express');
const router = express.Router();

// @route   GET api/profile
// @desc    Test users route

router.get('/', (req, res) => {
  res.send('Profile API Running');
});

module.exports = router;