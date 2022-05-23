const inquirer = require('inquirer');
const obtenerContratista = require('./read/contratista');
const consultarHabitaciones = require('./read/habitaciones');
const crearhabitacion = require('./create/habitacion');

function accionesContratista(idUsuariox){
    // Buscar el id del contratista con su id de usuario
    obtenerContratista(idUsuariox)
        // Esperar hasta que se devuelva la información del contratista
        .then((data) =>{
            let idEncontrado = JSON.stringify(data[0]._id);
            // Obtener el id del contratista
            let idContratista = idEncontrado.substring(1, idEncontrado.length - 1);
            
            // Pedirle al usuario que elija una opción disponible
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'eleccion',
                        message: 'Elija una opcion:',
                        choices: [ 
                            'Consultar habitaciones',
                            'Alquilar habitación',
                            'Salir', 
                        ],
                        default: 'Consultar habitaciones',
                    },
                ])
                .then((answers) => {
                    if(answers.eleccion == 'Consultar habitaciones'){
                        // Consultar las habitaciones registradas
                        consultarHabitaciones()
                            .then((datos) =>{
                                console.log('Habitaciones:');
                                console.log(datos);
                            })
                            .catch(err => console.log(err))
                    }
                    if(answers.eleccion == 'Alquilar habitación'){
                        inquirer
                            .prompt([
                                {
                                    name: 'descripcion',
                                    message: 'Descripcion:',
                                    default: 'Habitación para estudiantes',
                                },
                                {
                                    name: 'direccion',
                                    message: 'Direccion:',
                                    default: 'Desconocida',
                                },
                                {
                                    name: 'precio',
                                    message: 'Precio:',
                                    default: '0.00',
                                },
                                {
                                    name: 'nCamas',
                                    message: 'Número de Camas:',
                                    default: '1',
                                },
                            ])
                            .then((answers) => {
                                // Regitrar una habitación
                                crearhabitacion(answers, idContratista)
                                    .then((data) => {})
                                    .catch(err => console.log(err))
                            })
                    }
                })
        })
        .catch(err => console.log(err))
    }

module.exports = accionesContratista;
