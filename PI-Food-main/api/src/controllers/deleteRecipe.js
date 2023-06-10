const {Recipe} = require('../db');

module.exports = async (req,res) => {
    try {
        const {id} = req.params
        const recipe = await Recipe.findById(id)
        await recipe.destroy()
        return res.send('Delete Recipe')
    } 
    catch (error) {
        res.status(500).json({error: error.message});    
    }
}