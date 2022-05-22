// Constante llamada response donde va ser igual modulo express
const { response } = require('express');
// Constante llamada Factura donde va ser igual modulo del index
const { Factura } = require('../models/index');
// Constante llamada obtener Factura donde su funcion es mostrar todas las Facturas
const obtenerFacturas = async ( req, res = response )=>{
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado:true };
    const [ total, facturas ] = await Promise.all(
        [
            Factura.countDocuments(query),
            Factura.find(query)
            .skip(desde)
            .limit(limite)
        ]
    )
    res.json(
        {
            total,
            facturas
        }
    )
}
// Constante llamada obtener Factura donde su funcion es mostrar la Facturas pedida
const obtenerFactura = async ( req, res = response )=>{
    const { id } = req.params;
    const factura = await Factura.findById(id);
    res.json(factura);
}
// Constante llamada crear Factura donde su funcion es crear Facturas
const crearFactura = async ( req, res = response )=>{
    const { estado, ...body } = req.body;
    const factura = new Factura(body);
    const nuevaFactura = await factura.save();
    return res.status(201).json(nuevaFactura);
}
// Constante llamada actualizar Factura donde su funcion es actualizar la Factura modificado
const actualizarFactura = async ( req, res = response )=>{
    const { id } = req.params;
    const { estado, ...body } = req.body; 
    const facturaModificada = await Factura.findByIdAndUpdate(id, body, {new:true});
    res.json(facturaModificada)
}
// Constante llamada eliminar Factura donde su funcion es eliminar  la Factura
const eliminarFactura = async (req, res)=>{
    const { id } =req.params;
    const facturaEliminada = await Factura.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json(facturaEliminada)
}
// Modulos a Exportar
module.exports = { 
    obtenerFacturas,
    obtenerFactura,
    crearFactura,
    actualizarFactura,
    eliminarFactura
}
