const express = require('express');
const router = express.Router();

const db = require("../database/connect.js");
const users = db.get('users');

router.post("/courseData", (req, res) => {
	const userQuery = users.find({ email: req.user.email }).then((foundUser) => {
		console.log(foundUser);
	});

});

module.exports = router;