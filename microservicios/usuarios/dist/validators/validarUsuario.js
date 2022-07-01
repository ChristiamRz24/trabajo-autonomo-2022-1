"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarUsuario = void 0;
const express_validator_1 = require("express-validator");
const index_1 = require("../middlewares/index");
const validarUsuario = [
    // - - - - - - - - - - - - - - - -
    (0, express_validator_1.check)('usuario')
        .trim()
        .exists()
        .isString()
        .isLength({ min: 5, max: 20 })
        .withMessage('El usuario debe tener un mínimo 5 y máximo de 20 caracteres'),
    // - - - - - - - - - - - - - - - -
    (0, express_validator_1.check)('contrasena')
        .trim()
        .exists()
        .isString()
        .isLength({ min: 5, max: 20 })
        .withMessage('La contraseña debe tener un mínimo 5 y máximo de 20 caracteres'),
    // - - - - - - - - - - - - - - - -
    (0, express_validator_1.check)('tipo')
        .trim()
        .exists()
        .isString()
        .isLength({ min: 10, max: 11 })
        .withMessage('La tipo de usuario debe tener un mínimo 10 y máximo de 11 caracteres'),
    // - - - - - - - - - - - - - - - -
    (req, res, next) => {
        (0, index_1.validarCampos)(req, res, next);
    }
];
exports.validarUsuario = validarUsuario;
//# sourceMappingURL=validarUsuario.js.map