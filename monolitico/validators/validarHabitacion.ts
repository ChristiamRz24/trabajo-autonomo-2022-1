import { check } from 'express-validator';
import { validarCampos } from '../middlewares/index';

const validarHabitacion = [
    // - - - - - - - - - - - - - - - -
    check('descripcion')
        .exists()
        .isString()
        .isLength({min:10, max:50})
        .withMessage('La descripción debe tener un mínimo 10 y máximo de 50 caracteres'),
    // - - - - - - - - - - - - - - - -
    check('servicios')
        .exists()
        .isArray()
        .withMessage('Al menos debe agregar un servicio a la habitación'),
    // - - - - - - - - - - - - - - - -
    check('direccion')
        .exists()
        .isString()
        .isLength({min:10, max:50})
        .withMessage('La dirección debe tener un mínimo 10 y máximo de 50 caracteres'),
    // - - - - - - - - - - - - - - - -
    check('precio')
        .trim()
        .exists()
        .isNumeric()
        .withMessage('El precio debe ser numérico'),
    // - - - - - - - - - - - - - - - -
    check('nCamas')
        .trim()
        .exists()
        .isNumeric()
        .withMessage('El número de camas debe ser numérico'),
    // - - - - - - - - - - - - - - - -
    (req, res, next) => {
        validarCampos(req, res, next)
    }
]

export { validarHabitacion }
