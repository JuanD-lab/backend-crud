const { Usuarios, Vinos } = require("../models");
const { check, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

const signOptions = { expiresIn: "4h", algorithm: "HS512" };
const key = process.env.JWT_KEY

const createToken = (payload) => jwt.sign(payload, key, signOptions);

const auth = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usuarios.findOne({where: {email: email, password: password}})
    if (!user) res.status(401).json({ message: "Gatito no autorizado" });
    console.log("hay user");
    const { id } = user;

    const token = createToken({id, email }); // {_id : ObjectId, usuario : 'francodileo'}
    console.log("se ce token");
    res.json({ JWT: token });
  } catch (e) {
    console.log(e);
  }
};

const get = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        let content = await Usuarios.findOne({
            where: { id: id },
            include: [
                {
                    model: Vinos,
                    through: { attributes: [] },
                    attributes: ["id", "name"],
                },
            ],
        });
        if (content) {
            return res.json(content);
        } else {
            return res.status(404).json({
                message: `The content with id ${id} does not exist`,
            });
        }
    } catch (error) {
        next(error);
    }
};


const create = async (req, res, next) => {
    const { name, type, alcohol_percentage, is_active } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const newWine = await Usuarios.create({
            name: name,
            type: type,
            alcohol_percentage: alcohol_percentage,
            is_active: is_active,
        });

        res.status(201).json(newWine);
    } catch (error) {
        next(error);
    }
};

//Eliminación lógica
const eliminate = async (req, res, next) => {
    try {
        const { id } = req.params;

        const itemToRemove = await Usuarios.destroy({ where: { id } });
        if (itemToRemove) {
            res.status(200).json({
                ok: true,
                message: `element 'vino' with id ${id} was removed`,
            });
        } else {
            return res.status(404).json({
                ok: false,
                message: `The content with id ${id} does not exist`,
            });
        }
    } catch (error) {
        next(error);
    }
};

//middleware para validr los datos de un nuevo objeto vino
const validateFields = (method) => {
    switch (method) {
        case "createUser": {
            return [
                check("first_name")
                    .exists()
                    .withMessage('"first_name" no debe ser un campo vacío'),
                check("last_name")
                    .exists()
                    .withMessage('"last_name" no debe ser un campo vacío'),
                check("age")
                    .isInt()
                    .withMessage('"age" debe ser un número entero')
                    .exists(),
                check("email")
                    .isEmail()
                    .withMessage('El campo "email" debe ser un email valido')
                    .exists(),
                check("password")
                    .isString()
                    .exists()
                    .withMessage('El campo "password" no debe estar vacío'),
                check("is_active")
                    .isBoolean()
                    .withMessage('"is_active" debe ser boolean')
                    .exists(),
            ];
        }
    }
};

module.exports = {
    auth,
    get,
    create,
    eliminate,
    validateFields,
};