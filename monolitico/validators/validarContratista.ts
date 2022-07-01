import { check } from 'express-validator';
import { validarCampos } from '../middlewares/index';

const validarContratista = [
    // - - - - - - - - - - - - - - - -
    check('nombre')
        .exists()
        .isString()
        .isLength({min:3, max:20})
        .withMessage('El nombre no debe contener números y mínimo 3 y máximo de 20 caracteres'),
    // - - - - - - - - - - - - - - - -
    check('dni')
        .exists()
        .isString()
        .isLength({min:10, max:10})
        .withMessage('El dni debe tener un mínimo y máximo de 10 caracteres'),
    // - - - - - - - - - - - - - - - -
    check('direccion')
        .trim()
        .exists()
        .isAlphanumeric() // Revisar
        .isLength({min:10, max:50})
        .withMessage('La dirección debe tener un mínimo 10 y máximo de 50 caracteres'),
    // - - - - - - - - - - - - - - - -
    check('telefono')
        .exists()
        .isString()
        .isLength({min:10, max:10})
        .withMessage('El número de teléfono debe tener un mínimo y máximo de 10 caracteres'),
    // - - - - - - - - - - - - - - - -
    (req, res, next) => {
        validarCampos(req, res, next)
    }
]

export { validarContratista }
