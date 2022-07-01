import mongoose from 'mongoose';
import { IUsuario } from '../interfaces/index';

const { Schema, Model } = mongoose;

// Esquema de Mongoose para el usuario
const usuarioSchema: mongoose.Schema = new Schema<IUsuario>(
    {
        usuario: {
            type: String,
            require: true
        },
        contrasena: {
            type: String,
            require: true
        },
        tipo: {
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
const Usuario = mongoose.model<IUsuario>('usuarios', usuarioSchema);

export { Usuario }
