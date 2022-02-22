const { response } = require("express")



const getEventos = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getEventos'
    })
}

const crearEvento = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'crearEvento'
    })
}

const actualizarEvento = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'actualizarEvento'
    })
}

const EliminarEvento = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: ' eliminarEvento'
    })
}



module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    EliminarEvento
}