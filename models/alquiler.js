const { Schema, model } = require('mongoose')

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
        servicios: String,
        observacion: String,
        total: Number
    }
)

module.exports = model('Alquiler', alquilerSchema);
