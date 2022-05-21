// Constante llamada response donde va ser igual modulo express
// Constante llamada Tipo donde va ser igual modulo del index
const { response } = require('express');
const { Tipo } = require('../models/index');
// Constante llamada obtener Tipo donde su funcion es mostrar todos los Tipos
const obtenerTipos = async ( req, res = response )=>{
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado:true };
    const [ total, tipos ] = await Promise.all(
        [
            Tipo.countDocuments(),
            Tipo.find(query)
            .skip(desde)
            .limit(limite)
        ]
    )
    res.json(
        {
            total,
            tipos
        }
    )
}
// Constante llamada obtener Tipo donde su funcion es mostrar el Tipos pedido
const obtenerTipo = async ( req, res = response )=>{
    const { id } = req.params;
    const tipo = await Tipo.findById(id);
    res.json(tipo);
}
// Constante llamada crear Tipo donde su funcion es crear Tipos
const crearTipo = async ( req, res = response )=>{  
    const { estado, ...body } = req.body;
    
    const existeTipo = await Tipo.findOne({ nombre:body.nombre });
    if (existeTipo){
        return res.status(400).json({
            message: `El tipo con el nombre ${body.nombre} ya esta registrado.`
        })
    }
    const tipo = new Tipo(body);
    const nuevoTipo = await tipo.save();
    return res.status(201).json(nuevoTipo);
}
// Constante llamada actualizar Tipo donde su funcion es actualizar el Tipo modificado
const actualizarTipo = async ( req, res = response )=>{
    const { id } = req.params;
    const { estado, ...body } = req.body; 
    const tipoModificado = await Tipo.findByIdAndUpdate(id, body, {new:true});
    res.json(tipoModificado)
}
// Constante llamada eliminar Tipo donde su funcion es eliminar Tipo
const eliminarTipo = async (req, res)=>{
    const { id } =req.params;
    const tipoEliminado = await Tipo.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json(tipoEliminado)
}
// Modulos a Exportar
module.exports = { 
    obtenerTipos,
    obtenerTipo,
    crearTipo,
    actualizarTipo,
    eliminarTipo
}
