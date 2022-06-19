import Schema from 'mongoose';

export interface IAlquiler {
    contratista: Schema.Types.ObjectId,
    estudiante: Schema.Types.ObjectId,
    habitacion: Schema.Types.ObjectId,
    fechaEntrada: Date,
    fechaSalida: Date,
    total: Number,
    estado: Boolean
}
