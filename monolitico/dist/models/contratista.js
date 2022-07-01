"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contratista = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, Model } = mongoose_1.default;
// Esquema de Mongoose para el contratista
const contratistaSchema = new Schema({
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
    direccion: {
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
});
// Exportar el modelo
const Contratista = mongoose_1.default.model('contratistas', contratistaSchema);
exports.Contratista = Contratista;
//# sourceMappingURL=contratista.js.map