// Constante llamada response donde va ser igual modulo express
const { response } = require('express');
// Constante llamada Alquiler donde va ser igual modulo del index
const { Alquiler } = require('../models/index');
// Constante llamada obtener Alquiler donde su funcion es mostrar todos los Alquileres
const obtenerAlquileres = async ( req, res = response )=>{
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado:true };
    const [ total, alquileres ] = await Promise.all(
        [
            Alquiler.countDocuments(query),
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
// Constante llamada obtener Alquiler donde su funcion es mostrar el Alquileres pedido
const obtenerAlquiler = async ( req, res = response )=>{
    const { id } = req.params;
    const alquiler = await Alquiler.findById(id);
    res.json(alquiler);
}
// Constante llamada crear Alquiler donde su funcion es crear Alquileres
const crearAlquiler = async ( req, res = response )=>{
    const { estado, ...body } = req.body;
    const alquiler = new Alquiler(body);
    const nuevoAlquiler = await alquiler.save();
    return res.status(201).json(nuevoAlquiler);
}
// Constante llamada actualizar Alquiler donde su funcion es actualizar el Alquiler modificado
const actualizarAlquiler = async ( req, res = response )=>{
    const { id } = req.params;
    const { estado, ...body } = req.body; 
    const alquilerModificado = await Alquiler.findByIdAndUpdate(id, body, {new:true});
    res.json(alquilerModificado)
}
// Constante llamada eliminar Alquiler donde su funcion es eliminar Alquiler
const eliminarAlquiler = async (req, res)=>{
    const { id } = req.params;
    const alquilerEliminado = await Alquiler.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json(alquilerEliminado)
}
// Modulos a Exportar
module.exports = { 
    obtenerAlquileres,
    obtenerAlquiler,
    crearAlquiler,
    actualizarAlquiler,
    eliminarAlquiler
}
