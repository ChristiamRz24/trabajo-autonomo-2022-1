"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarUsuario = exports.actualizarUsuario = exports.crearUsuario = exports.obtenerUsuario = exports.obtenerUsuarios = void 0;
const index_1 = require("../models/index");
// Consultar los usuarios registrados
const obtenerUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, usuarios] = yield Promise.all([
        index_1.Usuario
            .countDocuments(query),
        index_1.Usuario
            .find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    });
});
exports.obtenerUsuarios = obtenerUsuarios;
// Consultar un usuario por su id
const obtenerUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield index_1.Usuario.findById(id);
    res.json(usuario);
});
exports.obtenerUsuario = obtenerUsuario;
//  Registrar un usuario en la base de datos
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = __rest(req.body, []);
    // Verificar si el usuario ya esta registrado
    const existeUsuario = yield index_1.Usuario.findOne({ usuario: body.usuario });
    if (existeUsuario) {
        return res.status(400).json({
            message: `El usuario con el nombre ${body.usuario} ya esta registrado`
        });
    }
    const usuario = new index_1.Usuario(body);
    const nuevoUsuario = yield usuario.save();
    return res.status(201).json(nuevoUsuario);
});
exports.crearUsuario = crearUsuario;
// Actualizar un usuario por su id
const actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = __rest(req.body, []);
    const usuarioModificado = yield index_1.Usuario.findByIdAndUpdate(id, body, { new: true });
    res.json(usuarioModificado);
});
exports.actualizarUsuario = actualizarUsuario;
// Eliminar un usuario por su id
const eliminarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuarioEliminado = yield index_1.Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(usuarioEliminado);
});
exports.eliminarUsuario = eliminarUsuario;
//# sourceMappingURL=usuario.js.map