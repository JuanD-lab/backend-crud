const { Vinos } = require("../models");
const { check, validationResult } = require("express-validator");

const getOne = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        let content = await Vinos.findOne({
            where: { id: id },
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

const list = async (req, res, next) => {
    try {
        const results = await Vinos.findAll();
        res.json(results);
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
        const newWine = await Vinos.create({
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

        const itemToRemove = await Vinos.destroy({ where: { id } });
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

const restore = async (req, res, next) => {
    try {
        const { id } = req.params;

        const itemToRestore = await Vinos.restore({ where: { id } });
        if(itemToRestore){
            res.status(200).json({
                ok: true,
                message: `element 'vino' with id ${id} was restored`,
            });
        }else {
            res.status(404).json({
                ok: false,
                message: `The content with id ${id} does not exist`,
            });
        }
    } catch (error) {
        next(error);
    }
};

//middleware para validr los datos de un nuevo objeto vino

const validate = (method) => {
    switch (method) {
        case "create": {
            return [
                check("name")
                    .exists()
                    .withMessage('"name" no debe ser un campo vacío'),
                check("type")
                    .exists()
                    .withMessage('"type" no debe ser un campo vacío'),
                check("alcohol_percentage")
                    .isDecimal()
                    .withMessage(
                        '"alcohol_percentage" debe ser un numero decimal'
                    )
                    .exists(),
                check("is_active")
                    .isBoolean()
                    .withMessage('"is_active" debe ser boolean')
                    .exists(),
            ];
        }
    }
};

module.exports = {
    getOne,
    list,
    create,
    eliminate,
    restore,
    validate,
};
