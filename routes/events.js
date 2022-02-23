

// Rutas de eventos
// host + /api/events


const { Router } = require('express')
const { validarJWT } = require('../middlewares/validar-jwt')
const { getEventos, crearEvento, actualizarEvento, EliminarEvento } = require('../controllers/events')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { isDate } = require('../helpers/isDate')
const router = Router()

//middleware para todas las rutas con el validarjwt
router.use(validarJWT)

router.get('/', getEventos)

router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio no valida').custom(isDate),
        check('end', 'Fecha de finalizacion obligatorio').not().isEmpty(),
        check('end', 'Fecha de finalizacion no valida').custom(isDate),
        validarCampos
    ],
    crearEvento
)

router.put('/:id', actualizarEvento)
router.delete('/:id', EliminarEvento)

module.exports = router