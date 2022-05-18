const { response } = require('express');
const { Habitacion } = require('../models/index');

const obtenerHabitaciones = async ( req, res = response )=>{
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado:true };
    const [ total, habitaciones ] = await Promise.all(
        [
            Habitacion.countDocuments(),
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

const obtenerHabitacion = async ( req, res = response )=>{
    const { id } = req.params;
    const habitacion = await Habitacion.findById(id);
    res.json(habitacion);
}

const crearHabitacion = async ( req, res = response )=>{
    const { estado, ...body } = req.body;
    const habitacion = new Habitacion(body);
    const nuevaHabitacion = await habitacion.save();
    return res.status(201).json(nuevaHabitacion);
}
//Solo modificar un atributo por función
const actualizarHabitacion = async ( req, res = response )=>{
    const { id } = req.params;
    const { estado, ...body } = req.body; 
    const habitacionModificada = await Habitacion.findByIdAndUpdate(id, body, {new:true});
    res.json(habitacionModificada)
}

const eliminarHabitacion = async (req, res)=>{
    const { id } =req.params;
    const habitacionEliminada = await Habitacion.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json(habitacionEliminada)
}

module.exports = { 
    obtenerHabitaciones,
    obtenerHabitacion,
    crearHabitacion,
    actualizarHabitacion,
    eliminarHabitacion
}
