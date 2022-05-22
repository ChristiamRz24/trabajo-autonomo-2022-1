const { Schema, model } = require('mongoose')

// Esquema de Mongoose para la habitación
const habitacionSchema = Schema(
    { 
        idContratista: { 
            type: Schema.Types.ObjectId,
            ref: "Contratista"
        },
        descripcion: String,
        direccion: String,
        precioPorDia: Number,
        nCamas: String
    })

// Exportar el modelo
module.exports = model('Habitacion', habitacionSchema);
