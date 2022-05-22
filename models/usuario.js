const { Schema, model } = require('mongoose')

// Esquema de Mongoose para el usuario
const usuarioSchema = Schema(
    {
        usuario: String,
        contrasena: String,
        tipo: String
    }
)

// Exportar el modelo
module.exports = model('Usuario', usuarioSchema);
