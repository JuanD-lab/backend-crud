"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UsuariosVinosFavoritos extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    UsuariosVinosFavoritos.init(
        {
            user_id: DataTypes.INTEGER,
            vino_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "UsuariosVinosFavoritos",
            tableName: "usuarios_vinos_favoritos",
            underscored: true,
            paranoid: true,
        }
    );
    return UsuariosVinosFavoritos;
};
