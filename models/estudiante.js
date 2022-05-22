const { Schema, model } = require('mongoose')

// Esquema de Mongoose para el estudiante
const estudianteSchema = Schema( 
{ 
    idUsuario: { 
        type: Schema.Types.ObjectId,
        ref: "Usuario"
    },
    nombre: String,
    dni: String,
    fechaNacimiento: String,
    lugarNacimiento: String,
    sexoEstudiante: String,
    correo: String,
    telefono: String
})

// Expprtamos el modelo
module.exports = model('Estudiante', estudianteSchema);
