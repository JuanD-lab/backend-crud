const { Vinos } = require("../models");

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
                message: `The content with id = ${id} does not exist`,
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

        await Vinos.destroy({ where: { id } });

        res.status(200).json({
            success: true,
        });
    } catch (error) {
        next(error);
    }
};

const restore = async (req, res, next) => {
    try {
        const { id } = req.params;

        await Vinos.restore({ where: { id } });

        res.status(200).json({
            restore: true,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getOne,
    list,
    create,
    eliminate,
    restore
};
