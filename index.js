const express = require('express')


//Crear el servidor de express
const app = express()

//rutas
app.get('/', (req, res) => {
    res.json({
        ok: true
    })
})


//Escuchar peticiones
app.listen(4000, () => {
    console.log(`Servidor corriendo en puerto ${4000}`)
})