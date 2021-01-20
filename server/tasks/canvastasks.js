const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const bcrypt = require("bcrypt");


router.get("/", async(req, res, next) => {
  const apiResponse = await fetch('https://catcourses.ucmerced.edu//api/v1/users/self/courses?include[]=total_scores&include[]=current_grading_period_scores&enrollment_type=student&include[]=concluded&per_page=1000', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${req.user.accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  });
  const json = await apiResponse.json();
  res.json(json);
});


module.exports = router;
