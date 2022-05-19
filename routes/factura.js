const{ Router } = require('express');
// check -> funciona como un middleware, pero no muestra nada.
const { check } = require('express-validator');

const{
    obtenerFacturas,
    obtenerFactura,
    crearFactura,
    eliminarFactura,
    actualizarFactura
} = require('../controllers').Factura;

const { validarCampos } = require('../middlewares/index');

const router =Router();

router.get('/factura', obtenerFacturas);
router.get('/factura/{id}', check('id', 'El id no es válido').isMongoId(), obtenerFactura);
router.post('/factura', crearFactura);
router.put('/factura/{id}', check('id', 'El id no es válido').isMongoId(), actualizarFactura);
router.delete('/factura/{id}', check('id', 'El id no es válido').isMongoId(), eliminarFactura);

module.exports = router;
