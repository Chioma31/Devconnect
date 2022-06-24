const express = require('express');
const router = express.Router();
const {register, login} = require('../../controllers/userscontroller');
   


//@routes GET api/users/test
//@desc   Tests users route
//@access Public
router.get('/test', (req, res) => res.json({msg: 'User Works'}));

//@routes GET api/users/register
//@desc   Register user
//@access Public
router.post('/register',register);

//@routes GET api/users/login
//@desc   login user/Returning JWT Token
//@access Public
router.post('/login', login)



module.exports = router; 
