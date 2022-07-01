import { Request, Response } from "express";
import { Habitacion } from "../models/index";
import { IHabitacion } from "../interfaces"

// Consultar las habitaciones registradas
const obtenerHabitaciones = async (req: Request, res: Response) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado:true };
    const [ total, habitaciones ] : [ Number, IHabitacion[] ] = await Promise.all(
        [
            Habitacion.
                countDocuments(query),
            Habitacion
                .find(query)
                .populate("contratista", { habitaciones: 0, alquileres: 0 })
                .skip(Number(desde))
                .limit(Number(limite))
        ]
    )
    res.json(
        {
            total,
            habitaciones
        }
    )
}

// Consultar una habitación por su id
const obtenerHabitacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const habitacion:IHabitacion|null = await Habitacion.findById(id).populate("contratista");
    res.json(habitacion);
}

//  Registrar una habitación en la base de datos
const crearHabitacion = async (req: Request, res: Response) => {
    const { ...body } = req.body;
    const habitacion = new Habitacion(body);
    const nuevaHabitacion = await habitacion.save();
    return res.status(201).json(nuevaHabitacion);
}

// Actualizar una habitación por su id
const actualizarHabitacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...body } = req.body;
    const habitacionModificada = await Habitacion.findByIdAndUpdate(id, body, {new:true});
    res.json(habitacionModificada)
}

// Eliminar una habitación por su id
const eliminarHabitacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const habitacionEliminada = await Habitacion.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json(habitacionEliminada)
}

// Módulos a exportar
export {
    obtenerHabitaciones,
    obtenerHabitacion,
    crearHabitacion,
    actualizarHabitacion,
    eliminarHabitacion
}
