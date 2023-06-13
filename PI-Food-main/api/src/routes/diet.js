const {Router} = require('express');
const {Diet} = require('../db');
const {types} = require('../controllers/diet');
const router = Router();

router.get('/', async(_req, res, next) => {
    try {
        types.forEach(async (n) => {
           await Diet.findOrCreate({
                where: {
                    name: n,
                }
            })
        });
        const diets = await Diet.findAll();
        res.send(diets);
        res.status(200).send(Diet)
    } catch (err) {
        next(err);
    }
})


module.exports = router;