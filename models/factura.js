const { Schema, model } = require('mongoose')

// Esquema de Mongoose para la factura
const facturaSchema = Schema( 
    { 
        idContratista: { 
            type: Schema.Types.ObjectId,
            ref: "Contratista"
        },
        idEstudiante: { 
            type: Schema.Types.ObjectId,
            ref: "Estudiante"
        },
        fechaFactura: String,
        formaPago: String,
        total: Number
    }
)

// Exportar el modelo
module.exports = model('Factura', facturaSchema);
