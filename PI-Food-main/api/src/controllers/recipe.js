const axios = require('axios');
const {Recipe,Diet} = require('../db');
const {API_KEY, URL_SPOONACULAR} = process.env; 

const getApiId = async (id) => {
    const apiID = await axios.get(`${URL_SPOONACULAR}/recipes/${id}/information?apiKey=${API_KEY}`)
    const detail = apiID.data

    let recipeDetail = {
        id,
        name: detail.title,
        summary: detail.summary,
        score: detail.score,
        healthScore: detail.healthScore,
        image: detail.image,
        steps: detail.analyzedInstructions[0]?.steps.map((s) => {
            return {
                number: s.number,
                step: s.step,
            }
        }),
        dish: detail.dishTypes,
        diets: detail.diets,  
    }
    return recipeDetail
}

const getDataBaseId = async (id) => {
    return await Recipe.findById(id, {
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}

const getApi = async () => {
    const resApi = await axios.get(`${URL_SPOONACULAR}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const {results} = resApi.data

    const infoApi = await results?.map((r) => {
        return {
            id: r.id,
            name: r.title,
            summary: r.summary,
            score: r.spoonacularScore,
            healthScore: r.healthScore,
            image: r.image,
            steps: r.analyzedInstructions[0]?.steps.map(s => {
                return {
                    number: s.number,
                    step: s.step,
                }
            }),
            diets: r.diets, 
            dish: r.dishTypes,
        }
    })
    return infoApi
}

const getDataBase = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}

const getAllRecipe = async () => {
    const get_Api = await getApi()
    const get_DataBase = await getDataBase()
    const all = get_Api.concat(get_DataBase)
    return all
}

module.exports = {
    getApiId, 
    getDataBaseId,
    getApi,
    getDataBase,
    getAllRecipe,
}