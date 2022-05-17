const { Schema, model } = require('mongoose')

const contratistaSchema = Schema( 
    { 
        idUsuario: { 
            type: Schema.Types.ObjectId,
            ref: "Usuario"
        },
        nombre: String,
        cedula: String,
        direccion: String,
        telefono: String,
    }
)

module.exports = model('Contratista', contratistaSchema);
