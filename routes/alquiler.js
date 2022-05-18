const { Router } = require('express');
// check -> funciona como un middleware, pero no muestra nada.
const { check } = require('express-validator');
//const { validarCampos } = require('../middlewares/validarCampos');

const{
    obtenerAlquileres,
    obtenerAlquiler,
    crearAlquiler,
    eliminarAlquiler,
    actualizarAlquiler
} = require('../controllers').Alquiler;

const { validarCampos } = require('../middlewares');

const router =Router();


router.get('/', obtenerAlquileres);
router.get('/:id', check('id', 'El id no es válido').isMongoId(), obtenerAlquiler);
router.post('/',  check('nombre', 'El nombre es requerido').not().isEmpty(), crearAlquiler);
router.put('/:id', check('id', 'El id no es válido').isMongoId(), actualizarAlquiler);
router.delete('/:id', check('id', 'El id no es válido').isMongoId(), eliminarAlquiler);

module.exports = router;
