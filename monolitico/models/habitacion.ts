import mongoose from 'mongoose';
import { IHabitacion } from '../interfaces/index';

const { Schema, Model } = mongoose;

// Esquema de Mongoose para la habitacion 
const habitacionSchema: mongoose.Schema = new Schema<IHabitacion>(
    {
        contratista: {
            type: Schema.Types.ObjectId,
            ref: "contratistas"
        },
        descripcion: {
            type: String,
            require: true
        },
        servicios: [
            {
                type: String
            }
        ],
        direccion: {
            type: String,
            require: true
        },
        precio: {
            type: Number,
            require: true
        },
        nCamas: {
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
const Habitacion = mongoose.model<IHabitacion>('habitaciones', habitacionSchema);

export { Habitacion }
