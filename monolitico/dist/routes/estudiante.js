"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// Importar las validaciones
const index_1 = require("../validators/index");
// Importar las funciones del controlador estudiante
const controllers_1 = require("../controllers");
const { obtenerEstudiantes, obtenerEstudiante, crearEstudiante, eliminarEstudiante, actualizarEstudiante } = controllers_1.Estudiante;
const router = (0, express_1.Router)();
exports.router = router;
// Rutas para el estudiante
router.get('/', obtenerEstudiantes);
router.get('/:id', obtenerEstudiante);
router.post('/', index_1.validarEstudiante, crearEstudiante);
router.put('/:id', actualizarEstudiante);
router.delete('/:id', eliminarEstudiante);
//# sourceMappingURL=estudiante.js.map