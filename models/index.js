const Alquiler = require('./alquiler')
const Contratista = require('./contratista')
const Estudiante = require('./estudiante')
const Factura = require('./factura')
const Habitacion = require('./habitacion')
const Tipo = require('./tipo')
const Usuario = require('./usuario')

const Modelos = {
    Alquiler,
    Contratista,
    Estudiante,
    Factura,
    Habitacion,
    Tipo,
    Usuario
}
module.exports = { Modelos }