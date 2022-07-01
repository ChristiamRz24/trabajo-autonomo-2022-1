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
exports.eliminarEstudiante = exports.actualizarEstudiante = exports.crearEstudiante = exports.obtenerEstudiante = exports.obtenerEstudiantes = void 0;
const index_1 = require("../models/index");
// Consultar los estudiantes registrados
const obtenerEstudiantes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, estudiantes] = yield Promise.all([
        index_1.Estudiante.
            countDocuments(query),
        index_1.Estudiante
            .find(query)
            .populate('alquiler', { estudiante: 0 })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        estudiantes
    });
});
exports.obtenerEstudiantes = obtenerEstudiantes;
// Consultar un estudiante por su id
const obtenerEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // - - - - - - - - - - - - - - - -
    const estudiante = yield index_1.Estudiante
        .findById(id)
        .populate('alquiler', { estudiante: 0 });
    // - - - - - - - - - - - - - - - -
    res.json(estudiante);
});
exports.obtenerEstudiante = obtenerEstudiante;
//  Registrar un estudiante en la base de datos
const crearEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = __rest(req.body, []);
    // Verificar si el estudiante ya esta registrado
    const existeEstudiante = yield index_1.Estudiante.findOne({ nombre: body.nombre });
    if (existeEstudiante) {
        return res.status(400).json({
            message: `El estudiante con el nombre ${body.nombre} ya esta registrado.`
        });
    }
    const estudiante = new index_1.Estudiante(body);
    const nuevoEstudiante = yield estudiante.save();
    return res.status(201).json(nuevoEstudiante);
});
exports.crearEstudiante = crearEstudiante;
// Actualizar un estudiante por su id
const actualizarEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = __rest(req.body, []);
    const estudianteModificado = yield index_1.Estudiante.findByIdAndUpdate(id, body, { new: true });
    res.json(estudianteModificado);
});
exports.actualizarEstudiante = actualizarEstudiante;
// Eliminar un estudiante por su id
const eliminarEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const estudianteEliminado = yield index_1.Estudiante.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(estudianteEliminado);
});
exports.eliminarEstudiante = eliminarEstudiante;
//# sourceMappingURL=estudiante.js.map