const express = require('express');
const app = express();

const auth = require("./auth/index.js");

app.use(express.json());
app.use('/auth', auth);

app.get('/', (req, res) => {
  res.send("Canvas Project");
});



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
// [] if validated you need to check in db if user already exists
// [] if user does not exist
// 	[] bcrypt password and access token and store in db
// 	[] create JWT token with user id from db and username
// [] create middleware to checkfortoken and set user if token exists
// [] create middleware to restrict access to canvas routes if not logged in
// [] if logged in create routes to get into db and use the encrypted access token to reach into canvas
