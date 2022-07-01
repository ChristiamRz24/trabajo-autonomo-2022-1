"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// Importar las validaciones
const index_1 = require("../validators/index");
// Importar las funciones del controlador habitacion
const controllers_1 = require("../controllers");
const { obtenerHabitaciones, obtenerHabitacion, crearHabitacion, eliminarHabitacion, actualizarHabitacion } = controllers_1.Habitacion;
const router = (0, express_1.Router)();
exports.router = router;
// Rutas para la habitacion
router.get('/', obtenerHabitaciones);
router.get('/:id', obtenerHabitacion);
router.post('/', index_1.validarHabitacion, crearHabitacion);
router.put('/:id', actualizarHabitacion);
router.delete('/:id', eliminarHabitacion);
//# sourceMappingURL=habitacion.js.map