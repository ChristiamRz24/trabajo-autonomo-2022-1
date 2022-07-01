import Schema from 'mongoose';

export interface IEstudiante {
    usuario: Schema.Types.ObjectId,
    alquiler: Schema.Types.ObjectId,
    nombre: String,
    dni: String,
    sexo: String,
    correo: String,
    telefono: String,
    estado: Boolean,
}
