const{ Router } = require('express');
// check -> funciona como un middleware, pero no muestra nada.
const { check } = require('express-validator');

// Importar las funciones del controlador factura
const{
    obtenerFacturas,
    obtenerFactura,
    crearFactura,
    eliminarFactura,
    actualizarFactura
} = require('../controllers').Factura;

const { validarCampos } = require('../middlewares/index');

const router =Router();

// Crear las rutas del RestAPI para la factura
router.get('/', obtenerFacturas);
router.get('/:id', check('id', 'El id no es válido').isMongoId(), obtenerFactura);
router.post('/', crearFactura);
router.put('/:id', check('id', 'El id no es válido').isMongoId(), actualizarFactura);
router.delete('/:id', check('id', 'El id no es válido').isMongoId(), eliminarFactura);

// Exportar las rutas
module.exports = router;
