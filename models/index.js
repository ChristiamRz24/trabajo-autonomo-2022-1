const mongoose = require('mongoose')
const conexion = 'mongodb+srv://admin:admin@proyectoalquileres.0zhba.mongodb.net/proyectoAlquileres?retryWrites=true&w=majority'

async function conectar() {
    const conectado = await mongoose.connect(conexion);
    console.log('Conectado')

    //Modelos
    const Contratista = mongoose.model('contratista', 
    { 
        idUsuario: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario"
        },
        nombre: String,
        cedula: String,
        direccion: String,
        telefono: String,
    })
    const Alquiler = mongoose.model('contratista', 
    { 
        idContratista: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contratista"
        },
        idEstudiante: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Estudiante"
        },
        fechaEntrada: String,
        fechaSalida: String,
        servicios: String,
        observacion: String,
        total: Number
    })
    const Estudiante = mongoose.model('estudiante', 
    { 
        idUsuario: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario"
        },
        nombre: String,
        dni: String,
        fechaNacimiento: String,
        lugarNacimiento: String,
        sexoEstudiante: String,
        correo: String,
        telefono: String
    })
    const Habitacion = mongoose.model('habitacion', 
    { 
        idContratista: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contratista"
        },
        descripcion: String,
        direccion: String,
        precio: Number,
        nCamas: String
    })
    const Factura = mongoose.model('factura', 
    { 
        idContratista: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contratista"
        },
        idEstudiante: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Estudiante"
        },
        fechaFactura: String,
        formaPago: String,
        total: Number
    })
    const Tipo = mongoose.model('tipo', 
    {  
        nombre: String
    })
    const Usuario = mongoose.model('usuario', 
    { 
        idTipo: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tipo"
        },
        nombre: String,
        contraseña: String
    })
}
