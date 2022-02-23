const { response, request } = require("express")
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

const actualizarEvento = async (req, res = response) => {
    //obtiene el valor del id que viene por url
    const eventoId = req.params.id  //idEvento
    const { uid } = req             //uidUser

    try {
        //busca si existe el evento en la db con el id de la url
        const evento = await Evento.findById(eventoId)
        if (!evento) {
            res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese id'
            })
        }//evento.user.toString() contiene el id de quien creo el evento y se compara con uid del user actual
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        } else {
            const nuevoEvento = {
                ...req.body,
                user: uid       //se agrega el uid ya que la peticion no la contiene
            }
            //actualiza evento(id del evento a actualizar,nueva data a guardar, {retorna el evento actualizado})
            const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true })
            res.json({
                ok: true,
                msg: eventoActualizado
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el admi'
        })
    }
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