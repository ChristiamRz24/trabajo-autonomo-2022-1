const { Schema, model } = require('mongoose')

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

module.exports = model('Estudiante', estudianteSchema);
