import { Request, Response } from "express";
import { Contratista } from "../models/contratista";
import { IContratista } from "../interfaces"

// Consultar los contratistas registrados
const obtenerContratistas = async (req: Request, res: Response) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado:true };
    const [ total, contratistas ] : [ Number, IContratista[] ] = await Promise.all(
        [
            Contratista
                .countDocuments(query),
            Contratista
                .find(query)
                /*
                 * Atributos no agregados en la consulta
                 * _id: 0
                 * contrasena: 0
                 * contratista: 0
                */
                .populate('usuario', { _id: 0, contrasena: 0 })
                .populate('habitaciones')
                .populate('alquileres', { contratista: 0 })
                .skip(Number(desde))
                .limit(Number(limite))
        ]
    )
    res.json(
        {
            total,
            contratistas
        }
    )
}

// Consultar un contratista por su id
const obtenerContratista = async (req: Request, res: Response) => {
    const { id } = req.params;
    // - - - - - - - - - - - - - - - -
    const contratista:IContratista|null =
    await Contratista
            .findById(id)
            .populate('usuario', { _id: 0, contrasena: 0 })
            .populate('habitaciones')
            .populate('alquileres', { contratista: 0 })
    // - - - - - - - - - - - - - - - -
    res.json(contratista);
}

//  Registrar un contratista en la base de datos
const crearContratista = async (req: Request, res: Response) => {
    const { ...body } = req.body;
    // Verificar si el contratista ya esta registrado
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

// Actualizar un contratista por su id
const actualizarContratista = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...body } = req.body;
    const contratistaModificado = await Contratista.findByIdAndUpdate(id, body, {new:true});
    res.json(contratistaModificado)
}

// Eliminar un contratista por su id
const eliminarContratista = async (req: Request, res: Response) => {
    const { id } = req.params;
    const contratistaEliminado = await Contratista.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json(contratistaEliminado)
}

// Módulos a exportar
export {
    obtenerContratistas,
    obtenerContratista,
    crearContratista,
    actualizarContratista,
    eliminarContratista
}
