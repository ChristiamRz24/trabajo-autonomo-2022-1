import { validationResult } from 'express-validator';

const validarCampos = (req, res, next) => {
    try {
        // Validar la petición
        validationResult(req).throw()
        // Pasar al siguiente middleware
        return next()
    } catch (err) {
        // Retornar los errores
        res.status(403).send({
            errors: err.array()
        })
    }
}

// Exportar el middleware
export { validarCampos }
