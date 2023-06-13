const {Router} = require('express');
const {Recipe, Diet} = require('../db');
const {types} = require('../controllers/diet');
const router = Router();

router.post("/", async (req, res, next) => {
    try {
    const { name, summary, score, healthScore, image, steps, diets } = req.body;
    const newRecipe = await Recipe.create({
      name,
      summary,
      score,
      healthScore,
      image,
      steps,

      summary: summary || "",
    });

    let dietDB = await Diet.findAll({
      where: {
        name: diets,
      },
    });
    newRecipe.addDiet(dietDB);

    let aux = diets.pop();
    let validate = types.includes(aux);
    if (!validate) {
      var noRepeat = Diet.findAll({
        where: {
          name: aux,
        },
      });
      if (!noRepeat.length) {
        const newDiet = await Diet.create({ name: aux });
        newRecipe.addDiet(newDiet);
        types.push(aux);
      }
    }
    res.status(200).send(newRecipe);
  } catch (err) {
    next(err);
  }
});



module.exports = router;