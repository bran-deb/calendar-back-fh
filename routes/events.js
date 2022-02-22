

// Rutas de eventos
// host + /api/events


const { Router } = require('express')
const { validarJWT } = require('../middlewares/validar-jwt')
const { getEventos, crearEvento, actualizarEvento, EliminarEvento } = require('../controllers/events')
const router = Router()

//middleware para todas las rutas con el validarjwt
router.use(validarJWT)

router.get('/', getEventos)
router.post('/', crearEvento)
router.put('/:id', actualizarEvento)
router.delete('/:id', EliminarEvento)

module.exports = router