const { Schema, model } = require('mongoose')

// Esquema de Mongoose para el contratista
const contratistaSchema = Schema( 
    { 
        idUsuario: { 
            type: Schema.Types.ObjectId,
            ref: "Usuario"
        },
        nombre: String,
        dni: String,
        direccion: String,
        telefono: String,
    }
)

// Exportar el modelo
module.exports = model('Contratista', contratistaSchema);
