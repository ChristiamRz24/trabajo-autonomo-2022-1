import { Request, Response } from "express";
import { Usuario } from "../models/index";
import { IUsuario } from "../interfaces"

// Consultar los usuarios registrados
const obtenerUsuarios = async (req: Request, res: Response) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado:true };
    const [ total, usuarios ] : [ Number, IUsuario[] ] = await Promise.all(
        [
            Usuario
                .countDocuments(query),
            Usuario
                .find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]
    )
    res.json(
        {
            total,
            usuarios
        }
    )
}

// Consultar un usuario por su id
const obtenerUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario:IUsuario|null = await Usuario.findById(id);
    res.json(usuario);
}

//  Registrar un usuario en la base de datos
const crearUsuario = async (req: Request, res: Response) => {
    const { ...body } = req.body;
    // Verificar si el usuario ya esta registrado
    const existeUsuario = await Usuario.findOne({ usuario:body.usuario });
    if (existeUsuario){
        return res.status(400).json({
            message: `El usuario con el nombre ${body.usuario} ya esta registrado`
        })
    }
    const usuario = new Usuario(body);
    const nuevoUsuario = await usuario.save();
    return res.status(201).json(nuevoUsuario);
}

// Actualizar un usuario por su id
const actualizarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...body } = req.body;
    const usuarioModificado = await Usuario.findByIdAndUpdate(id, body, {new:true});
    res.json(usuarioModificado)
}

// Eliminar un usuario por su id
const eliminarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuarioEliminado = await Usuario.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json(usuarioEliminado)
}

// Módulos a exportar
export {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}
