"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Habitacion = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, Model } = mongoose_1.default;
// Esquema de Mongoose para la habitacion 
const habitacionSchema = new Schema({
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
    alquilada: {
        type: Boolean,
        default: false
    },
    estado: {
        type: Boolean,
        default: true
    }
});
// Exportar el modelo
const Habitacion = mongoose_1.default.model('habitaciones', habitacionSchema);
exports.Habitacion = Habitacion;
//# sourceMappingURL=habitacion.js.map