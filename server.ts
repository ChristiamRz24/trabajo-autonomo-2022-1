import express, { Router, Express } from "express";
import cors from 'cors';

import { router as alquileres } from './routes/alquiler'
import { router as contratistas } from './routes/contratista'
import { router as estudiantes } from './routes/estudiante'
import { router as habitaciones } from './routes/habitacion'
import { router as usuarios } from './routes/usuario'

import { dbConnection } from "./database/config";

import dotenv from 'dotenv';
dotenv.config()

class Server {
    app: Router;
    router: Router;
    port:Number;
    paths: { [ key:string ] : string };
    private _express: Express;
    constructor(){
        this.app = Router();
        this.router = Router();
        this.port= Number(process.env["PORT"]);
        this.paths = {
            alquiler: '/api/alquiler',
            contratista: '/api/contratista',
            estudiante: '/api/estudiante',
            habitacion: '/api/habitacion',
            usuario: '/api/usuario'
        }
        this.conectarDB();
        this.middleware();
        this.routes();
        this.router.use('/v1/sextob', this.app);
        this._express = express().use(this.router);
    }
    private async conectarDB(){
        await dbConnection()
    }
    private middleware(){
        this.app.use(cors());
        this.app.use(express.json());
    }
    private routes(){
        this.app.use(this.paths.alquiler, alquileres);
        this.app.use(this.paths.contratista, contratistas);
        this.app.use(this.paths.estudiante, estudiantes);
        this.app.use(this.paths.habitacion, habitaciones);
        this.app.use(this.paths.usuario, usuarios);
    }
    listen(){
        this._express.listen(this.port, () => {
            console.log(`Server on port ${this.port}`);
        })
    }
}

export { Server }
