import Schema from 'mongoose';

export interface IEstudiante {
    usuario: Schema.Types.ObjectId,
    alquiler: String,
    nombre: String,
    dni: String,
    sexo: String,
    correo: String,
    telefono: String,
    estado: Boolean,
}
