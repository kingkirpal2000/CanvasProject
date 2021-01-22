const express = require('express');
const app = express();
const volleyball = require('volleyball');

const auth = require("./auth/index.js");
const middleware = require("./auth/middleware.js");
const tasks = require("./tasks/canvastasks.js");

app.use(volleyball);
app.use(express.json());

app.use(middleware.checktokenSetUser);

app.get('/', (req, res) => {
  res.json({
    message: "Canvas Project",
    user: req.user,
  });
});

app.use('/auth', auth);
app.use('/tasks', middleware.isLoggedin, tasks);


app.listen(8081, () => {
  console.log("Listening at http://localhost:8081");
});

function errorHandler(error, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message,
    stack: error.stack,
  });
  res.end();
}

app.use(errorHandler);


//DB Scheme;
  // Collection Users {
    // _id
    // email
    // password
    // accessToken
    // courses = [course1 {course _id, course name, course grading weights {w1: wv1, w2: wv2, w3: wv3}}]
  // }  

  // Collection Assignments {
    // Name
    // Type(test/quiz/hw)
    // Reference Course _id
    // {Type: Public, Reference User _id: null}
  // }
