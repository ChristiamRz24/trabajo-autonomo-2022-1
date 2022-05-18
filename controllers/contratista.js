const { response } = require('express');
const { Contratista } = require('../models/index');

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

const obtenerContratista = async ( req, res = response )=>{
    const { id } = req.params;
    const contratista = await Contratista.findById(id);
    res.json(contratista);
}

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
//Solo modificar un atributo por función
const actualizarContratista = async ( req, res = response )=>{
    const { id } = req.params;
    const { estado, ...body } = req.body; 
    const contratistaModificado = await Contratista.findByIdAndUpdate(id, body, {new:true});
    res.json(contratistaModificado)
}

const eliminarContratista = async (req, res)=>{
    const { id } =req.params;
    const contratistaEliminado = await Contratista.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json(contratistaEliminado)
}

module.exports = { 
    obtenerContratistas,
    obtenerContratista,
    crearContratista,
    actualizarContratista,
    eliminarContratista
}
