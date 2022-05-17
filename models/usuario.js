const { Schema, model } = require('mongoose')

const usuarioSchema = Schema(
    { 
        idTipo: { 
            type: Schema.Types.ObjectId,
            ref: "Tipo"
        },
        nombre: String,
        contraseña: String
    }
)

module.exports = model('Usuario', usuarioSchema);
