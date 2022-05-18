const { response } = require('express');
const { Tipo } = require('../models/index');

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

const obtenerTipo = async ( req, res = response )=>{
    const { id } = req.params;
    const tipo = await Tipo.findById(id);
    res.json(tipo);
}

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
//Solo modificar un atributo por función
const actualizarTipo = async ( req, res = response )=>{
    const { id } = req.params;
    const { estado, ...body } = req.body; 
    const tipoModificado = await Tipo.findByIdAndUpdate(id, body, {new:true});
    res.json(tipoModificado)
}

const eliminarTipo = async (req, res)=>{
    const { id } =req.params;
    const tipoEliminado = await Tipo.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json(tipoEliminado)
}

module.exports = { 
    obtenerTipos,
    obtenerTipo,
    crearTipo,
    actualizarTipo,
    eliminarTipo
}
