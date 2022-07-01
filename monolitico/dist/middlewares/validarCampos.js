"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCampos = void 0;
const express_validator_1 = require("express-validator");
const validarCampos = (req, res, next) => {
    try {
        // Validar la petición
        (0, express_validator_1.validationResult)(req).throw();
        // Pasar al siguiente middleware
        return next();
    }
    catch (err) {
        // Retornar los errores
        res.status(403).send({
            errors: err.array()
        });
    }
};
exports.validarCampos = validarCampos;
//# sourceMappingURL=validarCampos.js.map