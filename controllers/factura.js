const { response } = require('express');
const { Factura } = require('../models/index');

const obtenerFacturas = async ( req, res = response )=>{
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado:true };
    const [ total, facturas ] = await Promise.all(
        [
            Factura.countDocuments(),
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

const obtenerFactura = async ( req, res = response )=>{
    const { id } = req.params;
    const factura = await Factura.findById(id);
    res.json(factura);
}

const crearFactura = async ( req, res = response )=>{
    const { estado, ...body } = req.body;
    const factura = new Factura(body);
    const nuevaFactura = await factura.save();
    return res.status(201).json(nuevaFactura);
}
//Solo modificar un atributo por función
const actualizarFactura = async ( req, res = response )=>{
    const { id } = req.params;
    const { estado, ...body } = req.body; 
    const facturaModificada = await Factura.findByIdAndUpdate(id, body, {new:true});
    res.json(facturaModificada)
}

const eliminarFactura = async (req, res)=>{
    const { id } =req.params;
    const facturaEliminada = await Factura.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json(facturaEliminada)
}

module.exports = { 
    obtenerFacturas,
    obtenerFactura,
    crearFactura,
    actualizarFactura,
    eliminarFactura
}
