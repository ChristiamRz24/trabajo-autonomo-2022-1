require('dotenv').config()

// Para crear aplicaciones de consola con node
const inquirer = require('inquirer');

// Levantar el servidor
const Server = require('./server');
const server = new Server();
server.listen();

inquirer
    .prompt([
        {
            type: 'list',
            name: 'home',
            message: '¡Bienvenido! Eliga una opción:',
            choices: [
                'Iniciar sesión', 'Crear cuenta', 'Salir',
            ],
            default: 'Iniciar sesión',
        },
    ])
    .then(async answers => {
        switch(answers.home) { 
            case 'Iniciar sesión':
                const iniciarSesion = require('./src/home/login');
                iniciarSesion();
                break;
            case 'Crear cuenta':
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'tipoUsuario',
                            message: 'Elija un tipo de usuario:',
                            choices: [ 'Contratista', 'Estudiante', ],
                            default: 'Estudiante',
                        },
                    ])
                    .then(answers => {
                        switch(answers.tipoUsuario) { 
                            case 'Contratista':
                                const crearCuentaContratista = require('./src/home/create/accounts/contratista');
                                crearCuentaContratista();
                                break;
                            case 'Estudiante':
                                const crearCuentaEstudiante = require('./src/home/create/accounts/estudiante');
                                crearCuentaEstudiante();
                                break;
                            default:
                                break;
                            }
                        }
                    );
                break;
            default:
                break;
        }
    }
);
