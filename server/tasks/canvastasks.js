const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const bcrypt = require("bcrypt");

const db = require("../database/connect.js");
const users = db.get("users");

//Use this post method to populate courses in db then you can search using the course names
router.get("/", async (req, res, next) => {
  let responseArray = [];
  let json;
  try {
    const apiResponse = await fetch('https://catcourses.ucmerced.edu//api/v1/users/self/courses?include[]=total_scores&include[]=current_grading_period_scores&enrollment_type=student&include[]=concluded&per_page=1000', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${req.user.accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });
    json = await apiResponse.json();
  } catch (error) {
    next(error);
  }

  if (json) {
    const today = new Date();
    for (objects of json) {
      if (new Date(objects["end_at"]) > today) {
        const courseSchema = {
          id: objects["id"],
          name: objects["name"],
          gradingWeights: []
        }
        responseArray.push(courseSchema);
        users.update({ email: req.user.email }, { $addToSet: { courses: courseSchema } });
      }
    }
  }

  // Grading weights start here
  const foundQuery = await users.find({ email: req.user.email });
  const queryResult = await foundQuery[0]["courses"];
  const options = {
    headers: {
      'Authorization': `Bearer ${req.user.accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  let iterator = 0;
  for (objects of queryResult) {
    try {
      const fetchAPI = await fetch(`https://catcourses.ucmerced.edu/api/v1/courses/${objects["id"]}/assignment_groups`, options);
      const response = await fetchAPI.json();
      users.update({
        email: req.user.email,
        "courses.id": objects["id"]
      }, { $set: { "courses.$.gradingWeights": response } });
      responseArray[iterator++]["gradingWeights"].push(response);
    } catch (error) {
      next(error);
    }
  }
  //console.log(responseArray[0]["gradingWeights"]);
  res.json(responseArray); // This doesnt include grading weights fix later
});







module.exports = router;
