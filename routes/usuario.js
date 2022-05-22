const{ Router } = require('express');
// check -> funciona como un middleware, pero no muestra nada.
const { check } = require('express-validator');

// Importar las funciones del controlador usuario
const{
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    eliminarUsuario,
    actualizarUsuario
} = require('../controllers').Usuario;

const { validarCampos } = require('../middlewares/index');

const router = Router();

// Crear las rutas del RestAPI para el usuario
router.get('/', obtenerUsuarios);
router.get('/:id', check('id', 'El id no es válido').isMongoId(), obtenerUsuario);
router.post('/', check('nombre', 'El nombre es requerido').not().isEmpty(), crearUsuario);
router.put('/:id', check('id', 'El id no es válido').isMongoId(), actualizarUsuario);
router.delete('/:id', check('id', 'El id no es válido').isMongoId(), eliminarUsuario);

// Exportar las rutas
module.exports = router;
