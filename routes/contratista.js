const { Router } = require('express');
// check -> funciona como un middleware, pero no muestra nada.
const { check } = require('express-validator');

const{
    obtenerContratistas,
    obtenerContratista,
    crearContratista,
    eliminarContratista,
    actualizarContratista
} = require('../controllers').Contratista;

const { validarCampos } = require('../middlewares/index');

const router =Router();

router.get('/contratista', obtenerContratistas);
router.get('/contratista/{id}', check('id', 'El id no es válido').isMongoId(), obtenerContratista);
router.post('/contratista', check('nombre', 'El nombre es requerido').not().isEmpty(), crearContratista);
router.put('/contratista/{id}', check('id', 'El id no es válido').isMongoId(), actualizarContratista);
router.delete('/contratista/{id}', check('id', 'El id no es válido').isMongoId(), eliminarContratista);

module.exports = router;
