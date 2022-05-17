const { Schema, model } = require('mongoose')

const habitacionSchema = Schema(
    { 
        idContratista: { 
            type: Schema.Types.ObjectId,
            ref: "Contratista"
        },
        descripcion: String,
        direccion: String,
        precio: Number,
        nCamas: String
    })

module.exports = model('Habitacion', habitacionSchema);
