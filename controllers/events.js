const { response } = require("express")
const Evento = require("../models/Evento")



const getEventos = async (req, res = response) => {
    //retorna todos los eventos
    const eventos = await Evento.find()
        .populate('user', 'name')               //obtiene la informacion que contiene user(name,id,...)

    res.json({
        ok: true,
        eventos
    })
}

const crearEvento = async (req, res = response) => {
    //crea un nuevo evento en la DB
    const evento = new Evento(req.body)

    try {
        evento.user = req.uid
        const eventoGuardado = await evento.save()
        res.json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admi'
        })
    }
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