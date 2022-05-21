// Constante llamada response donde va ser igual modulo express
const { response } = require('express');
// Constante llamada Contratista donde va ser igual modulo del index
const { Contratista } = require('../models/index');
// Constante llamada obtener Contratista donde su funcion es mostrar todos los Contratista
const obtenerContratistas = async ( req, res = response )=>{
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado:true };
    const [ total, contratistas ] = await Promise.all(
        [
            Contratista.countDocuments(),
            Contratista.find(query)
            .skip(desde)
            .limit(limite)
        ]
    )
    res.json(
        {
            total,
            contratistas
        }
    )
}
// Constante llamada obtener Contratista donde su funcion es mostrar el Contratista pedido
const obtenerContratista = async ( req, res = response )=>{
    const { id } = req.params;
    const contratista = await Contratista.findById(id);
    res.json(contratista);
}
// Constante llamada crear Contratista donde su funcion es crear Contratistas
const crearContratista = async ( req, res = response )=>{
    const { estado, ...body } = req.body;
    
    const existeContratista = await Contratista.findOne({ nombre:body.nombre });
    if (existeContratista){
        return res.status(400).json({
            message: `El contratista con el nombre ${body.nombre} ya esta registrado.`
        })
    }
    const contratista = new Contratista(body);
    const nuevoContratista = await contratista.save();
    return res.status(201).json(nuevoContratista);
}
// Constante llamada actualizar Contratista donde su funcion es actualizar el Contratista modificado
const actualizarContratista = async ( req, res = response )=>{
    const { id } = req.params;
    const { estado, ...body } = req.body; 
    const contratistaModificado = await Contratista.findByIdAndUpdate(id, body, {new:true});
    res.json(contratistaModificado)
}
// Constante llamada eliminar Contratista donde su funcion es eliminar Contratista
const eliminarContratista = async (req, res)=>{
    const { id } =req.params;
    const contratistaEliminado = await Contratista.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json(contratistaEliminado)
}
// Modulos a Exportar
module.exports = { 
    obtenerContratistas,
    obtenerContratista,
    crearContratista,
    actualizarContratista,
    eliminarContratista
}
