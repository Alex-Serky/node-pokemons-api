const express = require('express')
let pokemons = require('./mock-pokemon.js')

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello, Express! 👋'))

// Le nouveau point de terminaison,
// affichant le nombre total de pokémons :
app.get('/api/pokemons', (req, res) => {
    res.send(`Il y a ${pokemons.length} pokémons dans le pokédex pour le moment.`)
})

// On utilise la liste de pokémons dans notre point de terminaison :
app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id) // id est maintenant un nombre !
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    res.send(`Vous avez demandé le pokémon ${pokemon.name}.`)
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
