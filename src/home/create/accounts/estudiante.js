const crearUsuario = require('../data/usuario');
const crearEstudiante = require('../data/estudiante');

const inquirer = require('inquirer');

function crearCuentaEstudiante() {
    const tipo = 'Estudiante';
    inquirer
        .prompt([
            {
                name: 'nombre',
                message: 'Digite su nombre: ',
                default: 'DefaultName',
            },
            {
                name: 'dni',
                message: 'Digite su dni: ',
                default: 'xxxxxxxxxx',
            },
            {
                name: 'fechaNacimiento',
                message: 'Digite su fecha de nacimiento: ',
                default: 'Desconocida',
            },
            {
                name: 'lugarNacimiento',
                message: 'Digite su lugar de nacimiento: ',
                default: 'Desconocido',
            },
            {
                name: 'sexoEstudiante',
                message: 'Digite su sexo: ',
                default: 'Indefinido',
            },
            {
                name: 'correo',
                message: 'Digite su correo: ',
                default: 'user123@gmail.com',
            },
            {
                name: 'telefono',
                message: 'Digite su telefono: ',
                default: '09xxxxxxxx',
            },
            {
                name: 'usuario',
                message: 'Digite su usuario: ',
                default: 'user123',
            },
            {
                name: 'contrasena',
                message: 'Digite su contraseña: ',
                default: 'user123',
            },
        ])
        .then((answers) => {
            // Primero registra el usuario del estudiante
            crearUsuario(answers, tipo)
                .then((data) => {
                    // Luego se registran los datos del estudiante
                    crearEstudiante(answers, data._id)
                        .then((data) => {})
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err))
        });
}

module.exports = crearCuentaEstudiante;
