import { check } from 'express-validator';
import { validarCampos } from '../middlewares/index';

const validarContratista = [
    // - - - - - - - - - - - - - - - -
    check('nombre')
        .exists()
        .isString()
        .isLength({min:3, max:20})
        .withMessage('El nombre no debe contener números y un mínimo 3 y máximo de 20 caracteres'),
    // - - - - - - - - - - - - - - - -
    check('dni')
        .exists()
        .isString()
        .isLength({min:10, max:10})
        .withMessage('El dni debe tener un mínimo y máximo de 10 caracteres'),
    // - - - - - - - - - - - - - - - -
    check('sexo')
        .exists()
        .isString()
        .isLength({min:5, max:10})
        .withMessage('El sexo debe tener un mínimo 5 y máximo de 10 caracteres'),
    // - - - - - - - - - - - - - - - -
    check('correo')
        .exists()
        .isEmail()
        .withMessage('El formato del correo es inválido'),
    // - - - - - - - - - - - - - - - -
    check('telefono')
        .exists()
        .isString()
        .isLength({min:10, max:10})
        .withMessage('El teléfono debe tener un mínimo y máximo de 10 caracteres'),
    // - - - - - - - - - - - - - - - -
    (req, res, next) => {
        validarCampos(req, res, next)
    }
]

export { validarContratista }
