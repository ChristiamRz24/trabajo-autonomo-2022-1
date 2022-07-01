import { check } from 'express-validator';
import { validarCampos } from '../middlewares/index';

const validarUsuario = [
    // - - - - - - - - - - - - - - - -
    check('usuario')
        .trim()
        .exists()
        .isString()
        .isLength({min:5, max:20})
        .withMessage('El usuario debe tener un mínimo 5 y máximo de 20 caracteres'),
    // - - - - - - - - - - - - - - - -
    check('contrasena')
        .trim()
        .exists()
        .isString()
        .isLength({min:5, max:20})
        .withMessage('La contraseña debe tener un mínimo 5 y máximo de 20 caracteres'),
    // - - - - - - - - - - - - - - - -
    check('tipo')
        .trim()
        .exists()
        .isString()
        .isLength({min:10, max:11})
        .withMessage('La tipo de usuario debe tener un mínimo 10 y máximo de 11 caracteres'),
    // - - - - - - - - - - - - - - - -
    (req, res, next) => {
        validarCampos(req, res, next)
    }
]

export { validarUsuario }
