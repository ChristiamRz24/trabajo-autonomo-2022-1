import mongoose from 'mongoose';
import { IAlquiler } from '../interfaces/index';

const { Schema, Model } = mongoose;

// Esquema de Mongoose para el alquiler
const alquilerSchema: mongoose.Schema = new Schema<IAlquiler>(
    {
        contratista: {
            type: Schema.Types.ObjectId,
            ref: "contratistas"
        },
        estudiante: {
            type: Schema.Types.ObjectId,
            ref: "estudiantes"
        },
        habitacion: {
            type: Schema.Types.ObjectId,
            ref: "habitaciones"
        },
        fechaEntrada: {
            type: Date,
            require: true
        },
        fechaSalida: {
            type: Date,
            require: true
        },
        total: {
            type: Number,
            require: true
        },
		estado: {
			type: Boolean,
			default: true
		}
    }
)

// Exportar el modelo
const Alquiler = mongoose.model<IAlquiler>('alquileres', alquilerSchema);

export { Alquiler }
