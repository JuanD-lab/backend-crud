"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Usuarios extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsToMany(models.Vinos, {
                through: "usuarios_vinos_favoritos",
                foreignKey: "user_id",
            });
        }
    }
    Usuarios.init(
        {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            age: DataTypes.INTEGER,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            token: DataTypes.TEXT,
            is_active: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Usuarios",
            tableName: "usuarios",
            underscored: true,
        }
    );
    return Usuarios;
};
