// Constante llamada response donde va ser igual modulo express
const { response } = require('express');
// Constante llamada Estudiante donde va ser igual modulo del index
const { Estudiante } = require('../models/index');
// Constante llamada obtener Estudiante donde su funcion es mostrar todos los Estudiantes
const obtenerEstudiantes = async ( req, res = response )=>{
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado:true };
    const [ total, estudiantes ] = await Promise.all(
        [
            Estudiante.countDocuments(query),
            Estudiante.find(query)
            .skip(desde)
            .limit(limite)
        ]
    )
    res.json(
        {
            total,
            estudiantes
        }
    )
}
// Constante llamada obtener Estudiante donde su funcion es mostrar el Estudiantes pedido
const obtenerEstudiante = async ( req, res = response )=>{
    const { id } = req.params;
    const estudiante = await Estudiante.findById(id);
    res.json(estudiante);
}
// Constante llamada crear Estudiante donde su funcion es crear Estudiantes
const crearEstudiante = async ( req, res = response )=>{
    const { estado, ...body } = req.body;
    
    const existeEstudiante = await Estudiante.findOne({ nombre:body.nombre });
    if (existeEstudiante){
        return res.status(400).json({
            message: `El estudiante con el nombre ${body.nombre} ya esta registrado.`
        })
    }
    const estudiante = new Estudiante(body);
    const nuevoEstudiante = await estudiante.save();
    return res.status(201).json(nuevoEstudiante);
}
// Constante llamada actualizar Estudiante donde su funcion es actualizar el Estudiante modificado
const actualizarEstudiante = async ( req, res = response )=>{
    const { id } = req.params;
    const { estado, ...body } = req.body; 
    const estudianteModificado = await Estudiante.findByIdAndUpdate(id, body, {new:true});
    res.json(estudianteModificado)
}
// Constante llamada eliminar Estudiante donde su funcion es eliminar Estudiante
const eliminarEstudiante = async (req, res)=>{
    const { id } =req.params;
    const estudianteEliminado = await Estudiante.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json(estudianteEliminado)
}
// Modulos a Exportar
module.exports = { 
    obtenerEstudiantes,
    obtenerEstudiante,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
}
