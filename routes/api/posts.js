const express = require ('express');
const router = express.Router();

// @route   GET api/posts
// @desc    Test users route

router.get('/', (req, res) => {
  res.send('Posts API Running');
});

module.exports = router;