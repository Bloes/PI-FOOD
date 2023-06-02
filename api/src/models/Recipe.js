const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resumen_plato: {
      type: DataTypes.INTEGER,
    },
    nivel_comida_saludable: {
      type: DataTypes.INTEGER,
    },
    paso_a_paso: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false });
};


