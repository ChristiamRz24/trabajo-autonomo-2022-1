const { Router } = require('express');
// check -> funciona como un middleware, pero no muestra nada.
const { check } = require('express-validator');

// Importar las funciones del controlador contratista
const{
    obtenerContratistas,
    obtenerContratista,
    crearContratista,
    eliminarContratista,
    actualizarContratista
} = require('../controllers').Contratista;

const { validarCampos } = require('../middlewares/index');

const router =Router();

// Crear las rutas del RestAPI para el contratista
router.get('/', obtenerContratistas);
router.get('/:id', check('id', 'El id no es válido').isMongoId(), obtenerContratista);
router.post('/', check('nombre', 'El nombre es requerido').not().isEmpty(), crearContratista);
router.put('/:id', check('id', 'El id no es válido').isMongoId(), actualizarContratista);
router.delete('/:id', check('id', 'El id no es válido').isMongoId(), eliminarContratista);

// Exportar las rutas
module.exports = router;
