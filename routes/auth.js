
// Rutas de Usuarios /Auth
// host + /api/auth


const { Router } = require('express')
const { check } = require('express-validator')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')
const router = Router()
const { validarCampos } = require('../middlewares/validar-campos')


router.post(
    '/new',
    [//middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),  //si no hay name
        check('email', 'El email es obligatorio').isEmail(),    //si no es email
        check('password', 'El password debe de tener 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
)
router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de tener 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
)
router.get('/renew', revalidarToken)


module.exports = router
