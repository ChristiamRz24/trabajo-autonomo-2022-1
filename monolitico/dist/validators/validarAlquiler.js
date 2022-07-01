"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarAlquiler = void 0;
const express_validator_1 = require("express-validator");
const index_1 = require("../middlewares/index");
const validarAlquiler = [
    // - - - - - - - - - - - - - - - -
    (0, express_validator_1.check)('fechaEntrada')
        .exists()
        .isISO8601()
        .withMessage('Fecha de entrada no válida'),
    // - - - - - - - - - - - - - - - -
    (0, express_validator_1.check)('fechaSalida')
        .exists()
        .isISO8601()
        .withMessage('Fecha de salida no válida'),
    // - - - - - - - - - - - - - - - -
    (0, express_validator_1.check)('total')
        .trim()
        .exists()
        .isNumeric()
        .withMessage('El total ingresado no es numérico'),
    // - - - - - - - - - - - - - - - -
    (req, res, next) => {
        (0, index_1.validarCampos)(req, res, next);
    }
];
exports.validarAlquiler = validarAlquiler;
// .exists()             verifica si el campo está vacío
// .isISO8601()          Verifica el formato de una fecha YYYY-MM-DD
// .isNumeric()          verifica si el campo es numérico
// .withMessage()        mensaje para el error
//# sourceMappingURL=validarAlquiler.js.map