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
exports.eliminarContratista = exports.actualizarContratista = exports.crearContratista = exports.obtenerContratista = exports.obtenerContratistas = void 0;
const contratista_1 = require("../models/contratista");
// Consultar los contratistas registrados
const obtenerContratistas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, contratistas] = yield Promise.all([
        contratista_1.Contratista
            .countDocuments(query),
        contratista_1.Contratista
            .find(query)
            /*
             * Atributos no agregados en la consulta
             * _id: 0
             * contrasena: 0
             * contratista: 0
            */
            .populate('habitaciones')
            .populate('alquileres', { contratista: 0 })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        contratistas
    });
});
exports.obtenerContratistas = obtenerContratistas;
// Consultar un contratista por su id
const obtenerContratista = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // - - - - - - - - - - - - - - - -
    const contratista = yield contratista_1.Contratista
        .findById(id)
        .populate('habitaciones')
        .populate('alquileres', { contratista: 0 });
    // - - - - - - - - - - - - - - - -
    res.json(contratista);
});
exports.obtenerContratista = obtenerContratista;
//  Registrar un contratista en la base de datos
const crearContratista = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = __rest(req.body, []);
    // Verificar si el contratista ya esta registrado
    const existeContratista = yield contratista_1.Contratista.findOne({ nombre: body.nombre });
    if (existeContratista) {
        return res.status(400).json({
            message: `El contratista con el nombre ${body.nombre} ya esta registrado.`
        });
    }
    const contratista = new contratista_1.Contratista(body);
    const nuevoContratista = yield contratista.save();
    return res.status(201).json(nuevoContratista);
});
exports.crearContratista = crearContratista;
// Actualizar un contratista por su id
const actualizarContratista = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = __rest(req.body, []);
    const contratistaModificado = yield contratista_1.Contratista.findByIdAndUpdate(id, body, { new: true });
    res.json(contratistaModificado);
});
exports.actualizarContratista = actualizarContratista;
// Eliminar un contratista por su id
const eliminarContratista = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const contratistaEliminado = yield contratista_1.Contratista.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(contratistaEliminado);
});
exports.eliminarContratista = eliminarContratista;
//# sourceMappingURL=contratista.js.map