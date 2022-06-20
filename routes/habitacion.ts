import { Router } from 'express';

// Importar las validaciones
import { validarHabitacion } from '../validators/index';

// Importar las funciones del controlador habitacion
import { Habitacion } from '../controllers';
const{
    obtenerHabitaciones,
    obtenerHabitacion,
    crearHabitacion,
    eliminarHabitacion,
    actualizarHabitacion
} = Habitacion;

const router = Router();

// Rutas para la habitacion
router.get('/', obtenerHabitaciones);
router.get('/:id', obtenerHabitacion);
router.post('/', validarHabitacion, crearHabitacion);
router.put('/:id', actualizarHabitacion);
router.delete('/:id', eliminarHabitacion);

// Rutas a exportar
export { router }
