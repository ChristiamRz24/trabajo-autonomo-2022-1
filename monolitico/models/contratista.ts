import mongoose from 'mongoose';
import { IContratista } from '../interfaces/index';

const { Schema, Model } = mongoose;

// Esquema de Mongoose para el contratista
const contratistaSchema: mongoose.Schema = new Schema<IContratista>(
    {
        habitaciones: [
            {
                type: Schema.Types.ObjectId,
                ref: "habitaciones"
            }
        ],
        alquileres: [
            {
                type: Schema.Types.ObjectId,
                ref: "alquileres"
            }
        ],
        nombre: {
            type: String,
            require: true
        },
        dni: {
			type: String,
			require: true
		},
		sexo: {
			type: String,
			require: true
		},
		correo: {
			type: String,
			require: true
		},
		telefono: {
			type: String,
			require: true
		},
		estado: {
			type: Boolean,
			default: true
		}
    }
)

// Exportar el modelo
const Contratista = mongoose.model<IContratista>('contratistas', contratistaSchema);

export { Contratista }
