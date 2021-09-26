const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')

// Méthode "maison", qui permet de mettre la première lettre d'une string en majuscule
const capitalize = str => str.charAt(0).toUpperCase() + str.substring(1)

module.exports = (app) => {
    app.get('/api/pokemons', (req, res) => {
        if(req.query.name) {
            const name = req.query.name // Paramètre de requête avec Express
            return Pokemon.findAndCountAll({
                where: {
                    name: { // name est la propriété du modèle pokémon recherchée
                        [Op.or]: {
                            [Op.like]: `%${name}%`,
                            [Op.startsWith]: capitalize(name)
                        }
                    }
                },
                limit: 5 // Le nombre de résultats maximum souhaités
            })
            .then((count, rows) => {
                const message = `Il y a ${count} qui correspondent au terme de recherche ${name}.`
                return res.json({ message, data: rows })
            })
        }else {
            Pokemon.findAll()
            .then(pokemons => {
                const message = 'La liste des pokémons a bien été récupérée.'
                res.json({ message, data: pokemons })
            })
            .catch(error => {
                const message = `La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants.`
                res.status(500).json({ message, data: error })
            })
        }
    })
}