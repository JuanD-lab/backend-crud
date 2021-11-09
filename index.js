const express = require("express");
const app = express();

const vinosRoutes = require("./src/routes/vinos.routes");
const usuariosRoutes = require("./src/routes/usuarios.routes");
//Middleware
app.use(express.json());

app.get("/", (req, res) => res.json({ Crud: "1.0.1" }));
app.use("/api", vinosRoutes);
app.use("/api", usuariosRoutes);

module.exports = app;
