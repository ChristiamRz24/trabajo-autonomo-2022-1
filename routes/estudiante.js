const{ Router } = require('express');
// check -> funciona como un middleware, pero no muestra nada.
const { check } = require('express-validator');

// Importar las funciones del controlador estudiante
const{
    obtenerEstudiantes,
    obtenerEstudiante,
    crearEstudiante,
    eliminarEstudiante,
    actualizarEstudiante
} = require('../controllers').Estudiante;

const { validarCampos } = require('../middlewares/index');

const router =Router();

// Crear las rutas del RestAPI para el estudiante
router.get('/', obtenerEstudiantes);
router.get('/:id', check('id', 'El id no es válido').isMongoId(), obtenerEstudiante);
router.post('/', check('nombre', 'El nombre es requerido').not().isEmpty(), crearEstudiante);
router.put('/:id', check('id', 'El id no es válido').isMongoId(), actualizarEstudiante);
router.delete('/:id', check('id', 'El id no es válido').isMongoId(), eliminarEstudiante);

// Exportar las rutas
module.exports = router;
