const {Router} = require('express')
const route = Router()
const {secured} = require("../middleware/auth")

const {auth, get, create, eliminate, validateFields} = require('../controllers/usuarios.controller')

//Endpoints//
route.post("/login", auth)
route.get("/user/:id", secured, get)
route.post("/user", validateFields('createUser'), create)
route.delete("/user/:id", secured, eliminate)

module.exports = route;