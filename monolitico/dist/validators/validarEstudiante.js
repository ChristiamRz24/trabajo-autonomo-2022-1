"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarEstudiante = void 0;
const express_validator_1 = require("express-validator");
const index_1 = require("../middlewares/index");
const validarEstudiante = [
    // - - - - - - - - - - - - - - - -
    (0, express_validator_1.check)('nombre')
        .exists()
        .isString()
        .isLength({ min: 3, max: 20 })
        .withMessage('El nombre no debe contener números y un mínimo 3 y máximo de 20 caracteres'),
    // - - - - - - - - - - - - - - - -
    (0, express_validator_1.check)('dni')
        .exists()
        .isString()
        .isLength({ min: 10, max: 10 })
        .withMessage('El dni debe tener un mínimo y máximo de 10 caracteres'),
    // - - - - - - - - - - - - - - - -
    (0, express_validator_1.check)('sexo')
        .exists()
        .isString()
        .isLength({ min: 5, max: 10 })
        .withMessage('El sexo debe tener un mínimo 5 y máximo de 10 caracteres'),
    // - - - - - - - - - - - - - - - -
    (0, express_validator_1.check)('correo')
        .exists()
        .isEmail()
        .withMessage('El formato del correo es inválido'),
    // - - - - - - - - - - - - - - - -
    (0, express_validator_1.check)('telefono')
        .exists()
        .isString()
        .isLength({ min: 10, max: 10 })
        .withMessage('El teléfono debe tener un mínimo y máximo de 10 caracteres'),
    // - - - - - - - - - - - - - - - -
    (req, res, next) => {
        (0, index_1.validarCampos)(req, res, next);
    }
];
exports.validarEstudiante = validarEstudiante;
//# sourceMappingURL=validarEstudiante.js.map