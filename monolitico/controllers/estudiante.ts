import { Request, Response } from "express";

import { Estudiante } from "../models/index";
import { IEstudiante } from "../interfaces";

import { Habitacion } from "../models/index";
import { IHabitacion } from "../interfaces";

// Consultar los estudiantes registrados
const obtenerEstudiantes = async (req: Request, res: Response) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado:true };
    const [ total, estudiantes ] : [ Number, IEstudiante[] ] = await Promise.all(
        [
            Estudiante.
                countDocuments(query),
            Estudiante
                .find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]
    )
    res.json(
        {
            total,
            estudiantes
        }
    )
}

// Consultar un estudiante por su id
const obtenerEstudiante = async (req: Request, res: Response) => {
    const { id } = req.params;
    // - - - - - - - - - - - - - - - - - - - - - - -
    const estudiante:IEstudiante|null = await Estudiante.findById(id)
    if(!estudiante) {
        return res.status(400).json({message: 'Estudiante no encontrado'})
    }
    const idAlquiler = estudiante.alquiler;
    if (idAlquiler != '') {
        const habitacionAlquilada:IHabitacion|null =
        await Habitacion.findById(idAlquiler)
        return res.status(200).json({
            info: estudiante,
            alquiler: habitacionAlquilada
        });
    }
    // - - - - - - - - - - - - - - - - - - - - - - -
    res.status(200).json({
        info: estudiante,
        alquiler: "Nada alquilado"
    });
}

//  Registrar un estudiante en la base de datos
const crearEstudiante = async (req: Request, res: Response) => {
    const { ...body } = req.body;
    // Verificar si el estudiante ya esta registrado
    const existeEstudiante = await Estudiante.findOne({ nombre:body.nombre });
    if (existeEstudiante) {
        return res.status(400).json({
            message: `El estudiante con el nombre ${body.nombre} ya esta registrado.`
        })
    }
    const estudiante = new Estudiante(body);
    const nuevoEstudiante = await estudiante.save();
    return res.status(201).json(nuevoEstudiante);
}

// Actualizar un estudiante por su id
const actualizarEstudiante = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...body } = req.body;
    const estudianteModificado = await Estudiante.findByIdAndUpdate(id, body, {new:true});
    res.json(estudianteModificado)
}

// Eliminar un estudiante por su id
const eliminarEstudiante = async (req: Request, res: Response) => {
    const { id } = req.params;
    const estudianteEliminado = await Estudiante.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json(estudianteEliminado)
}

// Módulos a exportar
export {
    obtenerEstudiantes,
    obtenerEstudiante,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
}
