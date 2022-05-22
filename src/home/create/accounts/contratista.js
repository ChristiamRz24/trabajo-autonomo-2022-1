const crearUsuario = require('../data/usuario');
const crearContratista = require('../data/contratista');

const inquirer = require('inquirer');

function crearCuentaContratista() {
    const tipo = 'Contratista';
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
                name: 'direccion',
                message: 'Digite su direccion: ',
                default: 'Desconocida',
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
            // Primero registra el usuario del contratista
            crearUsuario(answers, tipo)
                .then((data) => {
                    // Luego se registran los datos del estudiante
                    crearContratista(answers, data._id)
                        .then((data) => {})
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err))
        });
}

module.exports = crearCuentaContratista;
