const express = require("express");
const app = express();

//Middleware
app.use(express.json());

app.get("/", (req, res) => res.json({ "Crud": "1.0.1" }));


