// Constante llamada response donde va ser igual modulo express
const { response } = require('express');
// Constante llamada Usuario donde va ser igual modulo del index
const { Usuario } = require('../models/index');
// Constante llamada obtener Usuario donde su funcion es mostrar todos los Usuarios
const obtenerUsuarios = async ( req, res = response )=>{
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado:true };
    const [ total, usuarios ] = await Promise.all(
        [
            Usuario.countDocuments(query),
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
// Constante llamada obtener Usuario donde su funcion es mostrar el Usuarios pedido
const obtenerUsuario = async ( req, res = response )=>{
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    res.json(usuario);
}
// Constante llamada crear Usuario donde su funcion es crear Usuarios
const crearUsuario = async ( req, res = response )=>{  
    // const { estado, ...body } = req.body;
    const { ...body } = req.body;
    
    const existeUsuario = await Usuario.findOne({ usuario:body.usuario });
    if (existeUsuario){
        return res.status(400).json({
            message: `El usuario con el nombre ${body.usuario} ya esta registrado.`
        })
    }
    const usuario = new Usuario(body);
    const nuevoUsuario = await usuario.save();
    return res.status(201).json(nuevoUsuario);
}
// Constante llamada actualizar alquiler donde su funcion es actualizar el Usuario modificado
const actualizarUsuario = async ( req, res = response )=>{
    const { id } = req.params.id;
    // const { estado, ...body } = req.body;
    const { ...body } = req.body;
    const usuarioModificado = await Usuario.findByIdAndUpdate(id, body, {new:true});
    res.json(usuarioModificado)
}
// Constante llamada eliminar Usuario donde su funcion es eliminar Usuario
const eliminarUsuario = async (req, res = response )=>{
    const id = req.params.id;
    const usuarioEliminado = await Usuario.findOneAndUpdate(id, {estado:false}, {new:true})
    res.json(usuarioEliminado)
    
}
// Modulos a Exportar
module.exports = { 
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}
