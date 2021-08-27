// Les importations...
const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const pokemons = require('./mock-pokemon.js')
const {success, getUniqueId} = require('./helper.js') // Affectation destructurée

const app = express()
const port = 3000

// Avant : sans le paquet Morgan
// app.use((req, res, next) => {
//     console.log(`URL : ` + req.url)
//     next()
// })

// Après : avec le paquet Morgan
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(express.json())

app.get('/', (req, res) => res.send('Hello, Express! 👋'))

app.get('/api/pokemons', (req, res) => {
    const message = "La liste des pokémons a bien été récupérée."
    res.json(success(message, pokemons))
})

// Le nouveau point de terminaison,
// affichant le nombre total de pokémons :
app.get('/api/pokemons', (req, res) => {
    res.send(`Il y a ${pokemons.length} pokémons dans le pokédex pour le moment.`)
})

// On utilise la liste de pokémons dans notre point de terminaison :
app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id) // id est maintenant un nombre !
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = "Un pokémon a bien été trouvé."
    res.json(success(message, pokemon))
})

// L'ajout d'un pokémon
app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokémon ${pokemonCreated.name} a bien été créé.`
    res.json(success(message, pokemonCreated))
})

// La modification d'un pokémon
app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id }
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })

    const message = `Le pokemon ${pokemonUpdated.name} a bien été modifié.`
    res.json(success(message, pokemonUpdated))
})

// La suppression d'un pokemon
app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
    res.json(success(message, pokemonDeleted))
});


app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))