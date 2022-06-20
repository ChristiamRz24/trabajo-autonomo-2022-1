import mongoose from 'mongoose';
import { IEstudiante } from '../interfaces/index';

const { Schema, Model } = mongoose;

// Esquema de Mongoose para el estudiante
const estudianteSchema: mongoose.Schema = new Schema<IEstudiante>(
	{
		usuario: {
			type: Schema.Types.ObjectId,
			ref: "usuarios"
		},
		alquiler: {
			type: Schema.Types.ObjectId,
			ref: "alquileres"
		},
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
const Estudiante = mongoose.model<IEstudiante>('estudiantes', estudianteSchema);

export { Estudiante }
