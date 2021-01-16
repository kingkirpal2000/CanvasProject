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

// Creat user object 
//  -Once user is created, store token as JWT with ONLY username
//  -if they have token they will be able to access next route that calls for classes
