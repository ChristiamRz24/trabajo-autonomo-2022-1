const { Schema, model } = require('mongoose')

// Esquema de Mongoose para el alquiler
const alquilerSchema = Schema( 
    { 
        idContratista: { 
            type: Schema.Types.ObjectId,
            ref: "Contratista"
        },
        idEstudiante: { 
            type: Schema.Types.ObjectId,
            ref: "Estudiante"
        },
        fechaEntrada: String,
        fechaSalida: String,
        // servicios: String,
        // observacion: String,
        total: Number
    }
)

// Exportar el modelo
module.exports = model('Alquiler', alquilerSchema);
