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
exports.eliminarAlquiler = exports.actualizarAlquiler = exports.crearAlquiler = exports.obtenerAlquiler = exports.obtenerAlquileres = void 0;
const index_1 = require("../models/index");
// Consultar los alquileres registrados
const obtenerAlquileres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, alquileres] = yield Promise.all([
        index_1.Alquiler
            .countDocuments(query),
        index_1.Alquiler
            .find(query)
            .populate('contratista', {
            usuario: 0,
            habitaciones: 0,
            alquileres: 0
        })
            .populate('estudiante', { alquiler: 0 })
            .populate('habitacion')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        alquileres
    });
});
exports.obtenerAlquileres = obtenerAlquileres;
// Consultar un alquiler por su id
const obtenerAlquiler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // - - - - - - - - - - - - - - - -
    const alquiler = yield index_1.Alquiler
        .findById(id)
        .populate('contratista', {
        usuario: 0,
        habitaciones: 0,
        alquileres: 0
    })
        .populate('estudiante', { alquiler: 0 });
    // - - - - - - - - - - - - - - - -
    res.json(alquiler);
});
exports.obtenerAlquiler = obtenerAlquiler;
//  Registrar un alquiler en la base de datos
const crearAlquiler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = __rest(req.body, []);
    const alquiler = new index_1.Alquiler(body);
    const nuevoAlquiler = yield alquiler.save();
    return res.status(201).json(nuevoAlquiler);
});
exports.crearAlquiler = crearAlquiler;
// Actualizar un alquiler por su id
const actualizarAlquiler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = __rest(req.body, []);
    const alquilerModificado = yield index_1.Alquiler.findByIdAndUpdate(id, body, { new: true });
    res.json(alquilerModificado);
});
exports.actualizarAlquiler = actualizarAlquiler;
// Eliminar un alquiler por su id
const eliminarAlquiler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const alquilerEliminado = yield index_1.Alquiler.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(alquilerEliminado);
});
exports.eliminarAlquiler = eliminarAlquiler;
//# sourceMappingURL=alquiler.js.map