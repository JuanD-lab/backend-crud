const express = require("express");
const app = express();

const vinosRoutes = require("./src/routes/vinos.routes");
//Middleware
app.use(express.json());

app.get("/", (req, res) => res.json({ Crud: "1.0.1" }));
app.use("/api", vinosRoutes);

module.exports = app;
