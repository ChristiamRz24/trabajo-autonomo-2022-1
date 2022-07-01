"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, Model } = mongoose_1.default;
// Esquema de Mongoose para el usuario
const usuarioSchema = new Schema({
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
});
// Exportar el modelo
const Usuario = mongoose_1.default.model('usuarios', usuarioSchema);
exports.Usuario = Usuario;
//# sourceMappingURL=usuario.js.map