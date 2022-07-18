import { Router } from 'express';

// Importar las validaciones
import { validarUsuario } from '../validators/index';

// Importar las funciones del controlador usuario
import { Usuario } from '../controllers';
const{
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    login
} = Usuario;

const router = Router();

// Rutas para el usuario
router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuario);
router.get('/:user/:pass', login);
router.post('/', validarUsuario, crearUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

// Rutas a exportar
export { router }
