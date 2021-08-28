// Les importations...
const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
// const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 3000

app
.use(favicon(__dirname + '/favicon.ico'))
.use(morgan('dev'))
.use(express.json()); // Car bodyParser est déprécié (Used to parse JSON bodies)

sequelize.initDb()


// Ici, nous placerons nos futurs points de terminaisons !

require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))