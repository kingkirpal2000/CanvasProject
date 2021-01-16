const monk = require('monk');
const db = monk("localhost/canvas-students");


module.exports = db;
