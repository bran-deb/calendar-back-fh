const { response } = require('express')
const jwt = require('jsonwebtoken')


const validarJWT = (req, res = response, next) => {
    //header a leer es xtoken
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion"
        })
    }

    try {
        // const payload = jwt.verify(
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )
        //guardamos en el req los datos de uid y name
        req.uid = uid
        req.name = name

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token no valido"
        })
    }

    next()
}



module.exports = {
    validarJWT
}