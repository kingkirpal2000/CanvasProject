const express = require("express")
const router = express.Router();
const Joi = require('joi');

const db = require("../database/connect.js");
const users = db.get('users');
users.createIndex("username", { unique: true });

const Signupschema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu'] } }).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
});

router.get("/", (req, res) => {
  res.json({
    message: "Auth-Router Connected",
  });
});

router.post("/newstudent", (req, res, next) => {
  const result = Signupschema.validate(req.body);
  if(result.error){
    const error = new Error("Invalid Credentials");
    next(error);
  } else {
    users.findOne({
      email: req.body.email
    }).then((user)=>{
      if(user){
	const error = new Error("User with this email already exists");
	res.status(409);
	next(error);
      } else {
	res.send("Validated");
      }
    });
  }
});


module.exports = router;
