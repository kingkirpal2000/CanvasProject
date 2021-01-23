const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const bcrypt = require("bcrypt");

//Use this post method to populate courses in db then you can search using the course names
router.post("/", async(req, res, next) => {
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
  let result = [];
  if (json) {
    const today = new Date();
    for (objects of json) {
      if (new Date(objects["end_at"]) > today) {
        result.push(objects);
      }
    }
  }

});


module.exports = router;
