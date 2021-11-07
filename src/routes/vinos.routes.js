const {Router} = require('express')
const route = Router()

const {getOne, list, create, eliminate, restore} = require('../controllers/vinos.controller')

//Endpoints//
route.get("/vinos/:id", getOne)
route.get("/vinos", list)
route.post("/vinos", create)
route.delete("/vinos/:id", eliminate)
route.get("/vinos/:id/restore", restore)

module.exports = route;