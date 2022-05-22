// Constante llamada response donde va ser igual modulo express
const { response } = require('express');
// Constante llamada Habitacion donde va ser igual modulo del index
const { Habitacion } = require('../models/index');
// Constante llamada obtener Habitacion donde su funcion es mostrar todas las Habitaciones
const obtenerHabitaciones = async ( req, res = response )=>{
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado:true };
    const [ total, habitaciones ] = await Promise.all(
        [
            Habitacion.countDocuments(query),
            Habitacion.find(query)
            .skip(desde)
            .limit(limite)
        ]
    )
    res.json(
        {
            total,
            habitaciones
        }
    )
}
// Constante llamada obtener Habitacion donde su funcion es mostrar la Habitacion pedida
const obtenerHabitacion = async ( req, res = response )=>{
    const { id } = req.params;
    const habitacion = await Habitacion.findById(id);
    res.json(habitacion);
}
// Constante llamada crear Habitacion donde su funcion es crear Habitaciones
const crearHabitacion = async ( req, res = response )=>{
    const { estado, ...body } = req.body;
    const habitacion = new Habitacion(body);
    const nuevaHabitacion = await habitacion.save();
    return res.status(201).json(nuevaHabitacion);
}
// Constante llamada actualizar Habitacion donde su funcion es actualizar la Habitacion modificada
const actualizarHabitacion = async ( req, res = response )=>{
    const { id } = req.params;
    const { estado, ...body } = req.body; 
    const habitacionModificada = await Habitacion.findByIdAndUpdate(id, body, {new:true});
    res.json(habitacionModificada)
}
// Constante llamada eliminar Habitacion donde su funcion es eliminar la Habitacion
const eliminarHabitacion = async (req, res)=>{
    const { id } =req.params;
    const habitacionEliminada = await Habitacion.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json(habitacionEliminada)
}
// Modulos a Exportar
module.exports = { 
    obtenerHabitaciones,
    obtenerHabitacion,
    crearHabitacion,
    actualizarHabitacion,
    eliminarHabitacion
}
