const{ Router } = require('express');
// check -> funciona como un middleware, pero no muestra nada.
const { check } = require('express-validator');

const{
    obtenerEstudiantes,
    obtenerEstudiante,
    crearEstudiante,
    eliminarEstudiante,
    actualizarEstudiante
} = require('../controllers').Estudiante;

const { validarCampos } = require('../middlewares/index');

const router =Router();

router.get('/estudiante', obtenerEstudiantes);
router.get('/estudiante/{id}', check('id', 'El id no es válido').isMongoId(), obtenerEstudiante);
router.post('/estudiante', check('nombre', 'El nombre es requerido').not().isEmpty(), crearEstudiante);
router.put('/estudiante/{id}', check('id', 'El id no es válido').isMongoId(), actualizarEstudiante);
router.delete('/estudiante/{id}', check('id', 'El id no es válido').isMongoId(), eliminarEstudiante);

module.exports = router;
