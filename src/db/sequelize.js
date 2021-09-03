// On importe le module Sequelize :
const { Sequelize, DataTypes } = require('sequelize');
const PokemonModel = require('../models/pokemon')
const pokemons = require('./mock-pokemon.js')

// On configure la connexion à la base de données via Sequelize :
const sequelize = new Sequelize('pokedex', 'root', '',
    {
        host: '127.0.0.1',
        dialect: 'mariadb',
        dialectOptions: {
        timezone: 'Etc/GMT-2',
        },
        logging: true
    }
)

const Pokemon = PokemonModel(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
        // On initialise la base de données "Pokedex" avec 12 pokémons.
        pokemons.map(pokemon =>{ // Permet de boucler sur la liste des pokémons
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
            //    types: pokemon.types.join() // Affiche : "Plante,Poison" dans la BDD
            }).then(pokemon => console.log(pokemon.toJSON()))
            // toJSON() affiche les informations des instances d'un modèle
        })
        console.log('La base de données a bien été initialisisée !')
    })
}

module.exports = {
    initDb, Pokemon
}