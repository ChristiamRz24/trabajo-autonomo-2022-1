"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// Importar las validaciones
const index_1 = require("../validators/index");
// Importar las funciones del controlador contratista
const controllers_1 = require("../controllers");
const { obtenerContratistas, obtenerContratista, crearContratista, eliminarContratista, actualizarContratista } = controllers_1.Contratista;
const router = (0, express_1.Router)();
exports.router = router;
// Rutas para el contratista
router.get('/', obtenerContratistas);
router.get('/:id', obtenerContratista);
router.post('/', index_1.validarContratista, crearContratista);
router.put('/:id', actualizarContratista);
router.delete('/:id', eliminarContratista);
//# sourceMappingURL=contratista.js.map