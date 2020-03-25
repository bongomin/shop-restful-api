const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
require('../../models/Users')
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
require('dotenv').config()
const jwt = require('jsonwebtoken');


/* GET users listing. */
router.get('/users', function (req, res, next) {
   res.json({
      message: 'get all Users'
   });
});

// add new user /post Request
router.post('/signup', (req, res, next) => {
   User.find({ email: req.body.email })
      .exec()
      .then(user => {
         if (user.length >= 1) {
            return res.status(422).json({
               message: "Email already Exists"
            })
         } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
               if (err) {
                  error: err
               } else {
                  const user = new User({
                     _id: new mongoose.Types.ObjectId(),
                     email: req.body.email,
                     password: hash
                  });
                  user.save().then(result => {
                     console.log(result)
                     res.status(201).json({
                        msg: "user created"
                     })
                  }).catch(err => {
                     console.log(err)
                     res.status(500).json({
                        err: err
                     })
                  }

                  )

               }

            })

         }
      })
});


// login user


router.post('/login', (req, res) => {
   User.find({ email: req.body.email })
      .then(user => {
         if (user < 1) {
            return res.status(401).json({
               message: "Authentication Failed"
            })
         }
         bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
               res.status(401).json({
                  message: "Authentication failed"
               });
            }
            if (result) {
               const token = jwt.sign({
                  email: user[0].email,
                  userId: user[0]._id
               },
                  process.env.JWT_KEY,
                  {
                     expiresIn: "1h"
                  });
               return res.status(200).json({
                  message: "Authentication SuccessFull",
                  token:token
               });
            }
            res.ststus(401).json({
               message: "authentication failed"
            })
         })
      })
      .catch()
})

router.delete('/user/:id', (req, res, next) => {
   User.remove({ _id: req.params.id })
      .exec()
      .then(result => {
         res.status(200).json({
            message: "User successfully deleted"
         })
      })
      .catch(err => {
         res.status(500).json({
            err
         })
      })

})


// login user
router.post('/Login', (req, res, next) => {
   res.status(200).json({
      message: "Login User"
   })
})

// login user
router.post('/logout', (req, res, next) => {
   res.status(200).json({
      message: "logout User"
   })
})

module.exports = router