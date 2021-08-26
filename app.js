const express = require('express')
const pokemons = require('./mock-pokemon.js')
const {success} = require('./helper.js') // Affectation destructurée

const app = express()
const port = 3000

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
