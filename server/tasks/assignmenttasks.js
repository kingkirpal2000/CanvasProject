const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

const db = require("../database/connect.js");
const users = db.get("users");
const assignmentCol = db.get("AssignmentList");
assignmentCol.createIndex("assignments");

router.get("/", async (req, res, next) => {
	let response = [];
	const foundQuery = await users.find({ email: req.user.email });
	const queryResult = await foundQuery[0]["courses"];
	const options = {
		headers: {
			'Authorization': `Bearer ${req.user.accessToken}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	};
	for (objects of queryResult) {
		try {
			const fetchAssignments = await fetch(`https://catcourses.ucmerced.edu/api/v1/courses/${objects["id"]}/assignments`, options);
			const result = await fetchAssignments.json();

			for (assignments of result) {
				const assignmentSchema = {
					assignmentId: assignments["id"], // id
					courseId: assignments["course_id"], // objects["id"]
					private: false, // false in this route always
					name: assignments["name"], // name
					category: assignments["assignment_group_id"], // assignment_group_id
					due_at: assignments["due_at"] // due_at
				};
				response.push(assignmentSchema);
				assignmentCol.insert(assignmentSchema);
			}

		} catch (error) {
			next(error);
		}
	}
	res.json(response);
});

router.post("/newassignment", async (req, res, next) => {
	const foundQuery = await users.find({ email: req.user.email });
	const queryResult = await foundQuery[0]["courses"];
	let Courseid;
	let Categoryid;
	for (objects of queryResult) {
		if (req.body.courseName === objects["name"]) {
			Courseid = objects["id"];
		}
		for (courses of objects["gradingWeights"]) {
			if (req.body.category === courses["name"]) {
				Categoryid = courses["id"];
			}
		}
	}
	const assignmentSchema = {
		assignmentId: 0000,
		courseId: Courseid,
		private: true,
		name: req.body.name,
		category: Categoryid,
		due_at: new Date(req.body.due_at)
	};
	assignmentCol.insert(assignmentSchema);
	res.json(assignmentSchema);
});

module.exports = router;
