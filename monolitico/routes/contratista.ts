import { Router } from 'express';

// Importar las validaciones
import { validarContratista } from '../validators/index';

// Importar las funciones del controlador contratista
import { Contratista } from '../controllers';
const{
    obtenerContratistas,
    obtenerContratista,
    crearContratista,
    eliminarContratista,
    actualizarContratista
} = Contratista;

const router =Router();

// Rutas para el contratista
router.get('/', obtenerContratistas);
router.get('/:id', obtenerContratista);
router.post('/', validarContratista, crearContratista);
router.put('/:id', actualizarContratista);
router.delete('/:id', eliminarContratista);

// Rutas a exportar
export { router }
