const monk = require('monk');
const db = monk("localhost/canvasStudents");


module.exports = db;
