const { response } = require('express');
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')


const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body

    try {
        let usuario = await Usuario.findOne({ email })//verifica si hay un user registrado con el mismo correo

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        } else {
            usuario = new Usuario(req.body)

            //encriptar contraseña
            //encriptador
            const salt = bcrypt.genSaltSync()               //10 rounds default
            //encrita el pasoword (genera un hash)
            usuario.password = bcrypt.hashSync(password, salt)
            await usuario.save()                    //guarda en la DB

            res.status(201).json({
                ok: true,
                uid: usuario.id,
                name: usuario.name
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admi'
        })
    }
}

const loginUsuario = (req, res = response) => {
    const { email, password } = req.body

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    })
}

const revalidarToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}