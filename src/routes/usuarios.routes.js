const {Router} = require('express')
const route = Router()

const {auth, get, create, eliminate, validateFields} = require('../controllers/usuarios.controller')

//Endpoints//
route.post("/login", auth)
route.get("/user/:id", get)
route.post("/user", validateFields('createUser'), create)
route.delete("/user/:id", eliminate)

module.exports = route;