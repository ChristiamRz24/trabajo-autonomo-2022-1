const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

class Server {
    constructor(){
        // Definir dos niveles de rutas
        this.app = express.Router();
        this.router = express.Router();
        // Definir los demás atributos
        this.port = process.env.PORT;
        this.paths = {
            alquiler: '/api/alquiler',
            contratista: '/api/contratista',
            estudiante: '/api/estudiante',
            factura: '/api/factura',
            habitacion: '/api/habitacion',
            usuario: '/api/usuario'
        }
        // Llamar a los demás métodos
        this.conectarDB();
        this.middlewares();
        this.routes();
        this.router.use('/v1/sextob', this.app);
        //Hace referencia a la ruta padre
        this._express = express().use(this.router);
    }
    async conectarDB(){
        await dbConnection();
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }
    routes(){
        this.app.use(this.paths.alquiler, require('./routes/alquiler'));
        this.app.use(this.paths.contratista, require('./routes/contratista'));
        this.app.use(this.paths.estudiante, require('./routes/estudiante'));
        this.app.use(this.paths.factura, require('./routes/factura'));
        this.app.use(this.paths.habitacion, require('./routes/habitacion'));
        this.app.use(this.paths.usuario, require('./routes/usuario'));
    }
    listen(){
        this._express.listen(this.port, ()=>{
            // console.log(`Server on port ${this.port}`);
        });
    }
}

module.exports = Server;
