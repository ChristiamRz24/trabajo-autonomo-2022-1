const inquirer = require('inquirer');
const accionesContratista = require('../contratista/index');
const accionesEstudiante = require('../estudiante/index');

function iniciarSesion() {
    // Se le pide el id al usuario para iniciar la sesión
    inquirer
        .prompt([
            {
                name: 'id',
                message: 'Digite su id de usuario: ',
                default: 'Ninguno',
            },
        ])
        .then((answers) => {
            const consultarUsuario = require('./read/usuario');
            // Consultar la información del usuario por su id
            consultarUsuario(answers)
                .then((data) =>{
                    // Verificar el tipo de usuario
                    if(data.tipo == 'Contratista'){
                        console.log(`¡Bienvenido contratista: ${data.usuario}!`);
                        accionesContratista(data._id);
                    }
                    if(data.tipo == 'Estudiante'){
                        console.log(`¡Bienvenido estudiante: ${data.usuario}!`);
                        accionesEstudiante(data._id);
                    }
                })
                .catch(err => console.log(err))
            }
        );
}

module.exports = iniciarSesion;
