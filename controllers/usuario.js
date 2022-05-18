const { response } = require('express');
const { Usuario } = require('../models/index');

const obtenerUsuarios = async ( req, res = response )=>{
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado:true };
    const [ total, usuarios ] = await Promise.all(
        [
            Usuario.countDocuments(),
            Usuario.find(query)
            .skip(desde)
            .limit(limite)
        ]
    )
    res.json(
        {
            total,
            usuarios
        }
    )
}

const obtenerUsuario = async ( req, res = response )=>{
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    res.json(usuario);
}

const crearUsuario = async ( req, res = response )=>{  
    const { estado, ...body } = req.body;
    
    const existeUsuario = await Usuario.findOne({ nombre:body.nombre });
    if (existeUsuario){
        return res.status(400).json({
            message: `El usuario con el nombre ${body.nombre} ya esta registrado.`
        })
    }
    const usuario = new Usuario(body);
    const nuevoUsuario = await usuario.save();
    return res.status(201).json(nuevoUsuario);
}
//Solo modificar un atributo por función
const actualizarUsuario = async ( req, res = response )=>{
    const { id } = req.params;
    const { estado, ...body } = req.body; 
    const usuarioModificado = await Usuario.findByIdAndUpdate(id, body, {new:true});
    res.json(usuarioModificado)
}

const eliminarUsuario = async (req, res)=>{
    const { id } =req.params;
    const usuarioEliminado = await Usuario.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json(usuarioEliminado)
}

module.exports = { 
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}
