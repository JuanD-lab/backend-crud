const {Router} = require('express')
const route = Router()
const {secured} = require("../middleware/auth")

const {auth, get, create, addToFavorites, eliminate, validateFields} = require('../controllers/usuarios.controller')

//Endpoints//
route.post("/login", auth)
route.get("/user/:id", secured, get)
route.post("/user", validateFields('createUser'), create)
route.post("/user/favorite",secured, addToFavorites)
route.delete("/user/:id", secured, eliminate)

module.exports = route;