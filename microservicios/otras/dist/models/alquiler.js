"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alquiler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, Model } = mongoose_1.default;
// Esquema de Mongoose para el alquiler
const alquilerSchema = new Schema({
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
});
// Exportar el modelo
const Alquiler = mongoose_1.default.model('alquileres', alquilerSchema);
exports.Alquiler = Alquiler;
//# sourceMappingURL=alquiler.js.map