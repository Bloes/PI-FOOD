const {Recipe, Diets} = require('../db');
const {Op} = require('sequelize');

//!este código se encarga de crear una nueva receta en la base de datos, 
//!asignarle las dietas correspondientes y devolver la receta creada en la respuesta
module.exports = async (req,res) => {
    try {
        const {name, image, summary, healthScore, steps, diets} = req.body
        if(!name || !summary) return res.status(404).send("Creación cancelada, falta información")
        const newRecipe = await Recipe.create({name: name.tolowerCase(),
        [(/^.+.*\.(jpg|JPG|bmp|BMP|gif|GIF|tif|TIF|png|PNG)$/.test(image))? "image" : null]: image,
                                               summary,
                                               healthScore,
                                               steps})
        const dietsToAdd = await Diets.findAll({where: {
            name: {
                [Op.in]: diets? diets : []
            }
        }})
        await newRecipe.addDiets(dietsToAdd)
        return res.json(newRecipe)
    } 
    catch (error) {
        return res.status(404).json({error: error.message});
    }
}
