"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarHabitacion = void 0;
const express_validator_1 = require("express-validator");
const index_1 = require("../middlewares/index");
const validarHabitacion = [
    // - - - - - - - - - - - - - - - -
    (0, express_validator_1.check)('descripcion')
        .exists()
        .isString()
        .isLength({ min: 10, max: 50 })
        .withMessage('La descripción debe tener un mínimo 10 y máximo de 50 caracteres'),
    // - - - - - - - - - - - - - - - -
    (0, express_validator_1.check)('servicios')
        .exists()
        .isArray()
        .withMessage('Al menos debe agregar un servicio a la habitación'),
    // - - - - - - - - - - - - - - - -
    (0, express_validator_1.check)('direccion')
        .exists()
        .isString()
        .isLength({ min: 10, max: 50 })
        .withMessage('La dirección debe tener un mínimo 10 y máximo de 50 caracteres'),
    // - - - - - - - - - - - - - - - -
    (0, express_validator_1.check)('precio')
        .trim()
        .exists()
        .isNumeric()
        .withMessage('El precio debe ser numérico'),
    // - - - - - - - - - - - - - - - -
    (0, express_validator_1.check)('nCamas')
        .trim()
        .exists()
        .isNumeric()
        .withMessage('El número de camas debe ser numérico'),
    // - - - - - - - - - - - - - - - -
    (req, res, next) => {
        (0, index_1.validarCampos)(req, res, next);
    }
];
exports.validarHabitacion = validarHabitacion;
//# sourceMappingURL=validarHabitacion%20copy.js.map