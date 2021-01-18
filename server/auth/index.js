const express = require("express")
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const db = require("../database/connect.js");
const users = db.get('users');
users.createIndex("username", { unique: true });

const Signupschema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu'] } }).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  accessToken: Joi.string().required(),
});

const Loginschema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu'] } }).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
});

router.get("/", (req, res) => {
  res.json({
    message: "Auth-Router Connected",
  });
});

function createToken(user, res, next) {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1d' }, (err, token) => {
    if (err) {
      console.log(err);
      res.status(422);
      const error = new Error("Error Signing in User");
      next(error);
    } else {
      res.json({ token });
    }
  });
}

router.post("/newstudent", (req, res, next) => {
  const result = Signupschema.validate(req.body);
  if (result.error) {
    res.status(406);
    const error = new Error("Invalid Credentials");
    next(error);
  } else {
    users.findOne({
      email: req.body.email
    }).then((user) => {
      if (user) {
        const error = new Error("User with this email already exists");
        //res.status(409);
        next(error);
      } else {
        bcrypt.hash(req.body.password, 12).then((hashedPassword) => {
          bcrypt.hash(req.body.accessToken, 12).then((hashedAT) => {
            const insertUser = {
              email: req.body.email,
              password: hashedPassword,
              accessToken: hashedAT,
              courses: [], // Creted field already so we don't have to go back to update later
            };

            users.insert(insertUser).then((insertedUser) => {
              createToken(insertedUser, res, next);
            });

          });
        });
      }
    });
  }
});

router.post("/returningstudent", (req, res, next) => {
  const result = Loginschema.validate(req.body);
  if (result.error) {
    const err = new Error("Invalid Credentials");
    next(error);
  } else {
    users.findOne({ email: req.body.email }).then((foundUser) => {
      if (foundUser) {
        bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
          if (err) {
            const error = new Error("Error Signing in User.");
            next(error);
          } else {
            if (result) {
              createToken(foundUser, res, next);
            }
          }
        });
      } else {
        const error = new Error("No user found...");
        next(error);
      }
    });
  }
});


module.exports = router;
