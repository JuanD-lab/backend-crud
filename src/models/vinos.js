"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Vinos extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsToMany(models.Usuarios, {
                through: "usuarios_vinos_favoritos",
                foreignKey: "vino_id",
            });
        }
    }
    Vinos.init(
        {
            name: DataTypes.STRING,
            type: DataTypes.STRING,
            alcohol_percentage: DataTypes.DECIMAL,
            is_active: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Vinos",
            tableName: "vinos",
            underscored: true,
            paranoid: true,
        }
    );
    return Vinos;
};
