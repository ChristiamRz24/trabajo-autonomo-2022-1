const { Router } = require('express');
// check -> funciona como un middleware, pero no muestra nada.
const { check } = require('express-validator');

// Importar las funciones del controlador alquiler
const{
    obtenerAlquileres,
    obtenerAlquiler,
    crearAlquiler,
    eliminarAlquiler,
    actualizarAlquiler
} = require('../controllers').Alquiler;

const { validarCampos } = require('../middlewares/index');

const router =Router();

// Crear las rutas del RestAPI para el alquiler
router.get('/', obtenerAlquileres); 
router.get('/:id', check('id', 'El id no es válido').isMongoId(), obtenerAlquiler);
router.post('/', crearAlquiler);
router.put('/:id', check('id', 'El id no es válido').isMongoId(), actualizarAlquiler);
router.delete('/:id', check('id', 'El id no es válido').isMongoId(), eliminarAlquiler);

// Exportar las rutas
module.exports = router;
