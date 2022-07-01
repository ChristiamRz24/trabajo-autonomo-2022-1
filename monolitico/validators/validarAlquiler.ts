import { check } from 'express-validator';
import { validarCampos } from '../middlewares/index';

const validarAlquiler = [
    // - - - - - - - - - - - - - - - -
    check('fechaEntrada')
        .exists()
        .isISO8601()
        .withMessage('Fecha de entrada no válida'),
    // - - - - - - - - - - - - - - - -
    check('fechaSalida')
        .exists()
        .isISO8601()
        .withMessage('Fecha de salida no válida'),
    // - - - - - - - - - - - - - - - -
    check('total')
        .trim()
        .exists()
        .isNumeric()
        .withMessage('El total ingresado no es numérico'),
    // - - - - - - - - - - - - - - - -
    (req, res, next) => {
        validarCampos(req, res, next)
    }
]

export { validarAlquiler }

// .exists()             verifica si el campo está vacío
// .isISO8601()          Verifica el formato de una fecha YYYY-MM-DD
// .isNumeric()          verifica si el campo es numérico
// .withMessage()        mensaje para el error
