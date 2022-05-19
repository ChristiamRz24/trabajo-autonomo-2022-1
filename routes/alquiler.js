const { Router } = require('express');
// check -> funciona como un middleware, pero no muestra nada.
const { check } = require('express-validator');

const{
    obtenerAlquileres,
    obtenerAlquiler,
    crearAlquiler,
    eliminarAlquiler,
    actualizarAlquiler
} = require('../controllers').Alquiler;

const { validarCampos } = require('../middlewares/index');

const router =Router();

router.get('/alquiler', obtenerAlquileres);
router.get('/alquiler/{id}', check('id', 'El id no es válido').isMongoId(), obtenerAlquiler);
router.post('/alquiler', crearAlquiler);
router.put('/alquiler/{id}', check('id', 'El id no es válido').isMongoId(), actualizarAlquiler);
router.delete('/alquiler/{id}', check('id', 'El id no es válido').isMongoId(), eliminarAlquiler);

module.exports = router;
