const express = require('express');
const app = express();

app.get('/', (req, res)=>{
	res.send("Canvas Project");
});



app.listen(8081, ()=>{
	console.log("Listening at http://localhost:8081");
});



