const { Router } = require('express');
const router = Router();
const {
    getAllRecipe,
    getDataBaseId,
    getApiId} = require('../controllers/recipe')

router.get('/', async (req, res, next) => {
    try {
        const { name } = req.query;
        let AllRecipes = await getAllRecipe();

        if (name) {
            let recipeByName = await AllRecipes.filter(r => r.name.toLowerCase().includes(name.toString().toLowerCase())); 
            if(recipeByName.length) {
                let recipes = recipeByName.map(r => {
                    return { 
                        id: r.id,
                        name: r.name,
                        summary: r.summary,
                        score: r.score,
                        healthScore: r.healthScore,
                        image: r.image,
                        steps: r.steps,
                        diets: r.diets ? r.diets : r.diets.map(r => r.name)
                    }
                })
                return res.status(200).send(recipes);
            }
            return res.status(400).send('Recipe not found.');
        } else {
            let recipes = AllRecipes.map(r => {
                return { 
                    id: r.id,
                    name: r.name,
                    summary: r.summary,
                    score: r.score,
                    healthScore: r.healthScore,
                    image: r.image,
                    steps: r.steps,
                    diets: r.diets ? r.diets : r.diets.map(r => r.name),
                }
            })
            return res.status(200).send(recipes)
        }

    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        let validate = id.includes("-"); 
        if (validate) {
            let recipeDB = await getDataBaseId(id);
            return res.status(200).send(recipeDB);
        } else { // Se encuentra en la API
            let recipeAPI = await getApiId(id);
            return res.status(200).send(recipeAPI);
        }
    } catch (err) {
        next(err);
    }
});


module.exports = router;