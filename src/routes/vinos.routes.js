const {Router} = require('express')
const route = Router()

const {getOne, list, create, eliminate, restore, validate} = require('../controllers/vinos.controller')

//Endpoints//
route.get("/vinos/:id", getOne)
route.get("/vinos", list)
route.post("/vinos", validate('create'), create)
route.delete("/vinos/:id", eliminate)
route.get("/vinos/:id/restore", restore)

module.exports = route;