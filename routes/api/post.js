const express = require('express');
const router = express.Router(); 

//@routes GET api/users/test
//@desc   Tests users route
//@access Public
router.get('/test', (req, res) => res.json({msg: 'post Works'}));

module.exports = router; 