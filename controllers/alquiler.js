const { response } = require('express');
const { Alquiler } = require('../models/index');

const obtenerAlquileres = async ( req, res = response )=>{
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado:true };
    const [ total, alquileres ] = await Promise.all(
        [
            Alquiler.countDocuments(),
            Alquiler.find(query)
            .skip(desde)
            .limit(limite)
        ]
    )
    res.json(
        {
            total,
            alquileres
        }
    )
}

const obtenerAlquiler = async ( req, res = response )=>{
    const { id } = req.params;
    const alquiler = await Alquiler.findById(id);
    res.json(alquiler);
}

const crearAlquiler = async ( req, res = response )=>{
    const { estado, ...body } = req.body;
    const alquiler = new Alquiler(body);
    const nuevoAlquiler = await alquiler.save();
    return res.status(201).json(nuevoAlquiler);
}
//Solo modificar un atributo por función
const actualizarAlquiler = async ( req, res = response )=>{
    const { id } = req.params;
    const { estado, ...body } = req.body; 
    const alquilerModificado = await Alquiler.findByIdAndUpdate(id, body, {new:true});
    res.json(alquilerModificado)
}

const eliminarAlquiler = async (req, res)=>{
    const { id } =req.params;
    const alquilerEliminado = await Alquiler.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json(alquilerEliminado)
}
module.exports = { 
    obtenerAlquileres,
    obtenerAlquiler,
    crearAlquiler,
    actualizarAlquiler,
    eliminarAlquiler
}
