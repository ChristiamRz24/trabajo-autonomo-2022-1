// Importar los modelos desde los demás archivos
const Alquiler = require('./alquiler')
const Contratista = require('./contratista')
const Estudiante = require('./estudiante')
const Factura = require('./factura')
const Habitacion = require('./habitacion')
const Usuario = require('./usuario')

// Exportar todos los modelos
module.exports = { 
    Alquiler,
    Contratista,
    Estudiante,
    Factura,
    Habitacion,
    Usuario
}
