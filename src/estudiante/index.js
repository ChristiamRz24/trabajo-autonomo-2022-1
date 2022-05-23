const inquirer = require('inquirer');
const obtenerEstudiante = require('./read/estudiante');
const consultarHabitaciones = require('../contratista/read/habitaciones');
const obtenerHabitacion = require('./read/habitacion');
const crearAlquiler = require('./create/alquiler');

function accionesEstudiante(idUsuariox) {
    // Buscar el id del estudiante con su id de usuario
    obtenerEstudiante(idUsuariox)
        .then((data) => {
            let idEncontrado = JSON.stringify(data[0]._id);
            let idEstudiante = idEncontrado.substring(1, idEncontrado.length - 1);
            
            // Pedirle al usuario que elija una opción disponible
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'eleccion',
                        message: 'Elija una opcion:',
                        choices: [ 
                            'Consultar y alquilar',
                            'Solicitar habitación',
                            'Salir',
                        ],
                        default: 'Consultar y alquilar',
                    },
                ])
                .then((answers) => {
                    if(answers.eleccion == 'Consultar y alquilar'){
                        consultarHabitaciones()
                            .then((data) => {
                                console.log(data);
                                // Pedir los datos al usuario para alquilar la habitación
                                solicitarHabitacion(idEstudiante);
                            })
                            .catch((err) => console.log(err))
                    }
                    if(answers.eleccion == 'Solicitar habitación'){
                         // Pedir los datos al usuario para alquilar la habitación
                        solicitarHabitacion(idEstudiante);
                    }
                });
        })
        .catch(err => console.log(err))
}

function solicitarHabitacion(idEstudiantex) {
    inquirer
        .prompt([
            {
                name: 'id',
                message: 'Digite el id de la habitación:',
                default: 'Ninguno',
            },
        ])
        .then((answers) => {
            // Obtener la información de una habitación por sus id
            obtenerHabitacion(answers.id)
                .then((data) => {
                    // Pedir los datos del alquiler
                    inquirer
                        .prompt([
                            {
                                name: 'fechaEntrada',
                                message: 'Fecha de entrada:',
                                default: '2022-01-01',
                            },
                            {
                                name: 'fechaSalida',
                                message: 'Fecha de salida:',
                                default: '2022-02-01',
                            },
                        ])
                        .then((answers) => {
                            // Calcular los días de diferencia entre las fechas: entrada y salida
                            let dias = calcularDiasDiferencia(answers);
                            // Calcular el pago con el pago del alquiler
                            let totalPago = data.precioPorDia * dias;
                            // Registrar el alquiler en la base de datos
                            crearAlquiler(data.idContratista, idEstudiantex, answers, totalPago)
                                .then((data) => {})
                                .catch(err => console.log(err))
                        })
                })
                .catch((err) => console.log(err))
        })
}

// Calcular los días de diferencia entre las fechas: entrada y salida
function calcularDiasDiferencia(data) {
    const moment = require('moment');

    // Definir las dos fechas con el módulo 'moment'
    let fechaEntrada = moment(data.fechaEntrada);
    let fechaSalida = moment(data.fechaSalida);
    
    // Calcular los días de diferencia entre las dos fechas
    let dias = fechaSalida.diff(fechaEntrada, 'days');
    
    return dias;
}

module.exports = accionesEstudiante;
