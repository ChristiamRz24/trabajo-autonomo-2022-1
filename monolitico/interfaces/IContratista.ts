import Schema from 'mongoose';

export interface IContratista {
    usuario: Schema.Types.ObjectId,
    habitaciones: [Schema.Types.ObjectId],
    alquileres: [Schema.Types.ObjectId],
    nombre: String,
    dni: String,
    sexo: String,
    correo: String,
    telefono: String,
    estado: Boolean,
}
