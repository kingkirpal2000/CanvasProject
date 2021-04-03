const express = require('express');
const router = express.Router();

const db = require("../database/connect.js");
const users = db.get('users');
const assignmentCol = db.get('AssignmentList');


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

router.get("/assignmentnames", async (req, res, next) => {
  const foundQuery = await users.find({ email: req.user.email });
  const queryResult = await foundQuery[0]["courses"];
  let responseArray = [];
  for (objects of queryResult) {
    const query = {
      courseId: objects["id"],
      private: false
    };
    const privateQuery = {
      private: true,
      courseId: objects["id"],
      owner: req.user._id
    }
    const returned = await assignmentCol.find(query);
    for (assignments of returned) {
      responseArray.push(assignments["name"]);
    }

    const returnedPrivate = await assignmentCol.find(privateQuery);
    for (assignments of returnedPrivate) {
      responseArray.push(assignments["name"]);
    }
  }
  res.send(responseArray);
})

module.exports = router;