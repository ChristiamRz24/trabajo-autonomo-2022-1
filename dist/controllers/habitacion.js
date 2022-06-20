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
exports.eliminarHabitacion = exports.actualizarHabitacion = exports.crearHabitacion = exports.obtenerHabitacion = exports.obtenerHabitaciones = void 0;
const index_1 = require("../models/index");
// Consultar las habitaciones registradas
const obtenerHabitaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, habitaciones] = yield Promise.all([
        index_1.Habitacion.
            countDocuments(query),
        index_1.Habitacion
            .find(query)
            .populate("contratista", { habitaciones: 0, alquileres: 0 })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        habitaciones
    });
});
exports.obtenerHabitaciones = obtenerHabitaciones;
// Consultar una habitación por su id
const obtenerHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const habitacion = yield index_1.Habitacion.findById(id).populate("contratista");
    res.json(habitacion);
});
exports.obtenerHabitacion = obtenerHabitacion;
//  Registrar una habitación en la base de datos
const crearHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = __rest(req.body, []);
    const habitacion = new index_1.Habitacion(body);
    const nuevaHabitacion = yield habitacion.save();
    return res.status(201).json(nuevaHabitacion);
});
exports.crearHabitacion = crearHabitacion;
// Actualizar una habitación por su id
const actualizarHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = __rest(req.body, []);
    const habitacionModificada = yield index_1.Habitacion.findByIdAndUpdate(id, body, { new: true });
    res.json(habitacionModificada);
});
exports.actualizarHabitacion = actualizarHabitacion;
// Eliminar una habitación por su id
const eliminarHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const habitacionEliminada = yield index_1.Habitacion.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(habitacionEliminada);
});
exports.eliminarHabitacion = eliminarHabitacion;
//# sourceMappingURL=habitacion.js.map