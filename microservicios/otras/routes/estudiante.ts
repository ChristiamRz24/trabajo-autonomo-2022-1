import { Router } from 'express';

// Importar las validaciones
import { validarEstudiante } from '../validators/index';

// Importar las funciones del controlador estudiante
import { Estudiante } from '../controllers';
const{
    obtenerEstudiantes,
    obtenerEstudiante,
    crearEstudiante,
    eliminarEstudiante,
    actualizarEstudiante
} = Estudiante;

const router = Router();

// Rutas para el estudiante
router.get('/', obtenerEstudiantes);
router.get('/:id', obtenerEstudiante);
router.post('/', validarEstudiante, crearEstudiante);
router.put('/:id', actualizarEstudiante);
router.delete('/:id', eliminarEstudiante);

// Rutas a exportar
export { router }
