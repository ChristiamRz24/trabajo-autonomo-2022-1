import { Request, Response } from "express";
import { Alquiler } from "../models/index";
import { IAlquiler } from "../interfaces"

// Consultar los alquileres registrados
const obtenerAlquileres = async (req: Request, res: Response) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado:true };
    const [ total, alquileres ] : [ Number, IAlquiler[] ] = await Promise.all(
        [
            Alquiler
                .countDocuments(query),
            Alquiler
                .find(query)
                .populate('contratista', {
                    usuario: 0,
                    habitaciones: 0,
                    alquileres: 0
                })
                .populate('estudiante', { alquiler: 0 })
                .populate('habitacion')
                .skip(Number(desde))
                .limit(Number(limite))
        ]
    )
    res.json(
        {
            total,
            alquileres
        }
    )
}

// Consultar un alquiler por su id
const obtenerAlquiler = async (req: Request, res: Response) => {
    const { id } = req.params;
    // - - - - - - - - - - - - - - - -
    const alquiler:IAlquiler|null =
    await Alquiler
            .findById(id)
            .populate('contratista', {
                usuario: 0,
                habitaciones: 0,
                alquileres: 0
            })
            .populate('estudiante', { alquiler: 0 })
    // - - - - - - - - - - - - - - - -
    res.json(alquiler);
}

//  Registrar un alquiler en la base de datos
const crearAlquiler = async (req: Request, res: Response) => {
    const { ...body } = req.body;
    const alquiler = new Alquiler(body);
    const nuevoAlquiler = await alquiler.save();
    return res.status(201).json(nuevoAlquiler);
}

// Actualizar un alquiler por su id
const actualizarAlquiler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...body } = req.body;
    const alquilerModificado = await Alquiler.findByIdAndUpdate(id, body, {new:true});
    res.json(alquilerModificado)
}

// Eliminar un alquiler por su id
const eliminarAlquiler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const alquilerEliminado = await Alquiler.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json(alquilerEliminado)
}

// Módulos a exportar
export {
    obtenerAlquileres,
    obtenerAlquiler,
    crearAlquiler,
    actualizarAlquiler,
    eliminarAlquiler
}
