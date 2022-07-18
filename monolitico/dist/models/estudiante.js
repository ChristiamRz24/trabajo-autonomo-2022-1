"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estudiante = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, Model } = mongoose_1.default;
// Esquema de Mongoose para el estudiante
const estudianteSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        required: true
    },
    alquiler: {
        type: String,
        default: ""
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
});
// Exportar el modelo
const Estudiante = mongoose_1.default.model('estudiantes', estudianteSchema);
exports.Estudiante = Estudiante;
//# sourceMappingURL=estudiante.js.map