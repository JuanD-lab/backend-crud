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

app.use((err, req, res, next) => {
    if (err.name === "SequelizeValidationError") {
        const errObj = { message: "Validation error", errors: [] };
        err.errors.map((er) => {
            errObj.errors.push({ [er.path]: er.message });
        });
        return res.status(403).send(errObj);
    }
    if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).send({ message: "Register already exists" });
    }
    return res
        .status(500)
        .send("Ups tenemos un problema en el servidor, intentalo más tarde!");
});

module.exports = app;
