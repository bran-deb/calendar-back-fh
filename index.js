const express = require('express')
require('dotenv').config()
const { dbConnection } = require('./database/config')
const cors = require('cors');



//Crear el servidor de express
const app = express()

//base de datos
dbConnection()

//CORS
app.use(cors())

//directorio publico
app.use(express.static('public'))

//lectura y parseo del body para
//prosesa las peticiones en formato json y extrae su contenido
app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))
//TODO: CRUD: Eventos


//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})