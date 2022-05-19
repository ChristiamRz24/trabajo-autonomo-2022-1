const{ Router } = require('express');
// check -> funciona como un middleware, pero no muestra nada.
const { check } = require('express-validator');

const{
    obtenerHabitaciones,
    obtenerHabitacion,
    crearHabitacion,
    eliminarHabitacion,
    actualizarHabitacion
} = require('../controllers').Habitacion;

const { validarCampos } = require('../middlewares/index');

const router =Router();

router.get('/habitacion', obtenerHabitaciones);
router.get('/habitacion/{id}', check('id', 'El id no es válido').isMongoId(), obtenerHabitacion);
router.post('/habitacion', check('descripcion', 'La descripcion es requerida').not().isEmpty(), crearHabitacion);
router.put('/habitacion/{id}', check('id', 'El id no es válido').isMongoId(), actualizarHabitacion);
router.delete('/habitacion/{id}', check('id', 'El id no es válido').isMongoId(), eliminarHabitacion);

module.exports = router;
