import Schema from 'mongoose';

export interface IHabitacion {
    contratista: Schema.Types.ObjectId,
    descripcion:String,
    servicios:String,
    direccion: String,
    precio: Number,
    nCamas: Number,
    alquilada: Boolean,
    estado: Boolean,
}
