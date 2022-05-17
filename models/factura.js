const { Schema, model } = require('mongoose')

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

module.exports = model('Factura', facturaSchema);
