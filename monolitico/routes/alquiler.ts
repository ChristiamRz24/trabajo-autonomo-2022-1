import { Router } from 'express';

// Importar las validaciones
import { validarAlquiler } from '../validators/index';

// Importar las funciones del controlador alquiler
import { Alquiler } from '../controllers';
const {
    obtenerAlquileres,
    obtenerAlquiler,
    crearAlquiler,
    eliminarAlquiler,
    actualizarAlquiler
} = Alquiler;

const router = Router();

// Rutas para el alquiler

// router.post('/', ejemplosDeValidaciones, crearAlquiler);
router.get('/', obtenerAlquileres);
router.get('/:id', obtenerAlquiler);
router.post('/', validarAlquiler, crearAlquiler);
router.put('/:id', actualizarAlquiler);
router.delete('/:id', eliminarAlquiler);

// Rutas a exportar
export { router }
