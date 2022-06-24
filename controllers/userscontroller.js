const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

//load User model
const User = require('../models/User');

module.exports  = {
  register: (req, res) => {
    console.log("this is body==>",req.body)
    User.findOne({email: req.body.email })
    .then(user => {
      if(user) {
        return res.status(400).json({email: 'Email already exists'});
      }else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', //size 
          r: 'pg', //rating
          d: 'mm' //default
        });  
  
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password:req.body.password
         });
  
         bcrypt.genSalt(10, (err, salt) => {
           bcrypt.hash(newUser.password, salt, (err, hash) => {
             if(err) throw err;
             newUser.password = hash;
             newUser.save()
             .then(user => res.status(200).json({
               msg: "User created successfully",
               data:user
            }))
             .catch(err => console.log(err));
           })
         })
      }
    })
  },

  login: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    //find user by email
    User.findOne({email})
    .then(user => {
      //check for user
      if(!user) {
        return res.status(404).json({email: 'User not found'});
      }
  
  
      //check password
      bcrypt.compare(password, user.password)
      .then(isMatch => {
        if(isMatch) {
          // res.json({msg: 'Success'});
          //user matched
          const payload = { id: user.id, name: user.name, avatar: user.avatar}  //create JWT payload
  
          //signed Token
          jwt.sign(
            payload, 
            keys.secretOrKey, 
            { expiresIn: 3600 }),
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              })
            }
  
  
        } else {
          return res.status(400).json({password: 'password incorrect'})
        }
  
      })
  })
  
  }
};