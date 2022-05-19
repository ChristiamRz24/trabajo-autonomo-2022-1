const{ Router } = require('express');
// check -> funciona como un middleware, pero no muestra nada.
const { check } = require('express-validator');

const{
    obtenerTipos,
    obtenerTipo,
    crearTipo,
    eliminarTipo,
    actualizarTipo
} = require('../controllers').Tipo;

const { validarCampos } = require('../middlewares/index');

const router =Router();

router.get('/tipo', obtenerTipos);
router.get('/tipo/{id}', check('id', 'El id no es válido').isMongoId(), obtenerTipo);
router.post('/tipo', check('nombre', 'El nombre es requerido').not().isEmpty(), crearTipo);
router.put('/tipo/{id}', check('id', 'El id no es válido').isMongoId(), actualizarTipo);
router.delete('/tipo/{id}', check('id', 'El id no es válido').isMongoId(), eliminarTipo);

module.exports = router;
