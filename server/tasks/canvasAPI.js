const express = require('express');
const router = express.Router();

const db = require("../database/connect.js");
const users = db.get('users');

router.get("/coursenames", async (req, res, next) => {
  const foundQuery = await users.find({ email: req.user.email });
  const queryResult = await foundQuery[0]["courses"];
  let responseArray = [];
  for (objects of queryResult) {
    const courseName = objects['name'].split('-');
    if (courseName[0].length < 4) {
      responseArray.push(courseName[1]);
    }
  }
  res.send(responseArray);
});

module.exports = router;