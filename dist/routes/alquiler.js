"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// Importar las validaciones
const index_1 = require("../validators/index");
// Importar las funciones del controlador alquiler
const controllers_1 = require("../controllers");
const { obtenerAlquileres, obtenerAlquiler, crearAlquiler, eliminarAlquiler, actualizarAlquiler } = controllers_1.Alquiler;
const router = (0, express_1.Router)();
exports.router = router;
// Rutas para el alquiler
// router.post('/', ejemplosDeValidaciones, crearAlquiler);
router.get('/', obtenerAlquileres);
router.get('/:id', obtenerAlquiler);
router.post('/', index_1.validarAlquiler, crearAlquiler);
router.put('/:id', actualizarAlquiler);
router.delete('/:id', eliminarAlquiler);
//# sourceMappingURL=alquiler.js.map