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
app.use('/tasks', tasks);


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
// [] ready to create get course canvas route
// [] if logged in create routes to get into db and use the encrypted access token to reach into canvas
// [] create login route
