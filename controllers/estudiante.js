const { response } = require('express');
const { Estudiante } = require('../models/index');

const obtenerEstudiantes = async ( req, res = response )=>{
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado:true };
    const [ total, estudiantes ] = await Promise.all(
        [
            Estudiante.countDocuments(),
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

const obtenerEstudiante = async ( req, res = response )=>{
    const { id } = req.params;
    const estudiante = await Estudiante.findById(id);
    res.json(estudiante);
}

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
//Solo modificar un atributo por función
const actualizarEstudiante = async ( req, res = response )=>{
    const { id } = req.params;
    const { estado, ...body } = req.body; 
    const estudianteModificado = await Estudiante.findByIdAndUpdate(id, body, {new:true});
    res.json(estudianteModificado)
}

const eliminarEstudiante = async (req, res)=>{
    const { id } =req.params;
    const estudianteEliminado = await Estudiante.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json(estudianteEliminado)
}

module.exports = { 
    obtenerEstudiantes,
    obtenerEstudiante,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
}
