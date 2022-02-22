const { response } = require('express');
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


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
            //generar JWT
            const token = await generarJWT(usuario.id, usuario.name)

            res.status(201).json({
                ok: true,
                uid: usuario.id,
                name: usuario.name,
                token
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

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body

    try {
        const usuario = await Usuario.findOne({ email })

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "el usuario no existe con ese email"
            })
        }
        //Confirmar los passwords
        //compara password de la peticion con el password encriptada de la db
        const validPassword = bcrypt.compareSync(password, usuario.password)
        if (!validPassword) {
            res.status(400).json({
                ok: false,
                msg: "Password incorrecto"
            })
        } else {
            //generar JWT
            const token = await generarJWT(usuario.id, usuario.name)

            res.status(200).json({
                ok: true,
                uid: usuario.id,
                name: usuario.name,
                token
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "por favor habble con el admi"
        })
    }
}

const revalidarToken = async (req, res = response) => {
    const { uid, name } = req

    //no se necesita verificar si existe el token por que el middleware ya verifico
    //generar JWT
    const token = await generarJWT(uid, name)
    res.status(201).json({
        ok: true,
        token
    })
}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}