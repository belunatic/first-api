const express = require("express");
const cors = require("cors");
//data
let data = require("./data");
const { json } = require("body-parser");
const app = express();
//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("<h1>Welcome to my API</h1>");
});
app.get("/api/person", (req, res) => {
	res.json(data);
});

app.get("/api/person/:id", (req, res) => {
	const id = Number(req.params.id);
	personData = data.filter((person) => person.id === id);
	console.log(personData === false);
	if (personData.length === 0) {
		res.status(404).send("That person does not exists");
	} else {
		res.json(personData);
	}
});

app.delete("/api/person/:id", (req, res) => {
	const id = Number(req.params.id);
	data = data.filter((person) => person.id !== id);
	res.status(204).end();
});

//generate an id
const generateId = () => {
	const maxId =
		data.length > 0 ? Math.max(...data.map((n) => Number(n.id))) : 0;
	return maxId + 1;
};

app.post("/api/person", (req, res) => {
	const body = req.body;
	if (!req.body.name) {
		return res.status(404).json({ Error: "Name is required" });
	} else if (!req.body.age) {
		return res.status(404).json({ Error: "Age is required" });
	}

	const personData = {
		id: generateId(),
		name: req.body.name,
		age: req.body.age,
		address: req.body.address || "NA",
		phone_number: req.body.phone_number || "NA",
	};

	data = [...data, personData];

	res.json(data);
});

app.listen(process.env.PORT || 5000, () => {
	console.log("I am listening, so no worries your secret is safe with me");
});
