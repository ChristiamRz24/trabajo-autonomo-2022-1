const{ Router } = require('express');
// check -> funciona como un middleware, pero no muestra nada.
const { check } = require('express-validator');

// Importar las funciones del controlador habitacion
const{
    obtenerHabitaciones,
    obtenerHabitacion,
    crearHabitacion,
    eliminarHabitacion,
    actualizarHabitacion
} = require('../controllers').Habitacion;

const { validarCampos } = require('../middlewares/index');

const router =Router();

// Crear las rutas del RestAPI para la habitacion
router.get('/', obtenerHabitaciones);
router.get('/:id', check('id', 'El id no es válido').isMongoId(), obtenerHabitacion);
router.post('/', check('descripcion', 'La descripcion es requerida').not().isEmpty(), crearHabitacion);
router.put('/:id', check('id', 'El id no es válido').isMongoId(), actualizarHabitacion);
router.delete('/:id', check('id', 'El id no es válido').isMongoId(), eliminarHabitacion);

// Exportar las rutas
module.exports = router;
