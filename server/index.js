const express = require('express');
const app = express();
const volleyball = require('volleyball');

const auth = require("./auth/index.js");
const middleware = require("./auth/middleware.js");

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

// TODO:
// [] create JWT token with user id from db and username
// [] create middleware to checkfortoken and set user if token exists
// [] create middleware to restrict access to canvas routes if not logged in
// [] if logged in create routes to get into db and use the encrypted access token to reach into canvas
// [] for each user add a collection of classes
// [] create login route
