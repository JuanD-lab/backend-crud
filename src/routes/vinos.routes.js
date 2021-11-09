const {Router} = require('express')
const route = Router()
const {secured} = require("../middleware/auth")

const {getOne, list, create, eliminate, restore, validate} = require('../controllers/vinos.controller')

//Endpoints//
route.get("/vinos/:id", secured, getOne)
route.get("/vinos", secured, list)
route.post("/vinos", secured, validate('create'), create)
route.delete("/vinos/:id", secured, eliminate)
route.get("/vinos/:id/restore", secured, restore)

module.exports = route;