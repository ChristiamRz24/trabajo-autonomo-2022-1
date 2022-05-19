const{ Router } = require('express');
// check -> funciona como un middleware, pero no muestra nada.
const { check } = require('express-validator');

const{
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    eliminarUsuario,
    actualizarUsuario
} = require('../controllers').Usuario;

const { validarCampos } = require('../middlewares/index');

const router =Router();

router.get('/usuario', obtenerUsuarios);
router.get('/usuario/{id}', check('id', 'El id no es válido').isMongoId(), obtenerUsuario);
router.post('/usuario', check('nombre', 'El nombre es requerido').not().isEmpty(), crearUsuario);
router.put('/usuario/{id}', check('id', 'El id no es válido').isMongoId(), actualizarUsuario);
router.delete('/usuario/{id}', check('id', 'El id no es válido').isMongoId(), eliminarUsuario);

module.exports = router;
