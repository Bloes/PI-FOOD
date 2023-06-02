require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST,} = process.env;
const RecipeModel = require('./models/Recipe');
const DietsModel = require('./models/Diets');

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`, 
{logging: false, native: false});

// EJERCICIO 05
// Debajo de este comentario puedes ejecutar la función de los modelos.
RecipeModel(sequelize);
DietsModel(sequelize);

// Ejercicio 06
// ¡Relaciona tus modelos aquí abajo!
const {Recipe,Diets} = sequelize.models;
Recipe.belongsToMany(Diets,{through: 'receta_dieta', timestamps: false});
Diets.belongsToMany(Recipe,{through: 'receta_dieta', timestamps: false});


module.exports = {
  Recipe,
  Diets,
  conn: sequelize,     
};
