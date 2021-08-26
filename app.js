// Les importations...
const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const pokemons = require('./mock-pokemon.js')
const {success} = require('./helper.js') // Affectation destructurée

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

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
