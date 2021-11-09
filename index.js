const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const fs = require("fs");

const vinosRoutes = require("./src/routes/vinos.routes");
const usuariosRoutes = require("./src/routes/usuarios.routes");
//Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
    //access logs
    logger("combined", {
        stream: fs.createWriteStream("access.log", { flags: "a" }),
    })
);

app.get("/", (req, res) => res.json({ Crud: "1.0.1" }));
app.use("/api", vinosRoutes);
app.use("/api", usuariosRoutes);

module.exports = app;
