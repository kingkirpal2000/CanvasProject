const express = require('express');
const router = express.Router();

const db = require("../database/connect.js");
const assignmentCol = db.get("AssignmentList");




// Assignement => {
// private - userId it belongs to
// courseId it belongs to 
// name
// which category it belongs to  
//}
