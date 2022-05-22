const axios = require('axios').default;

const url = '/v1/sextob/api/estudiante';

const crearEstudiante = (data, idUsuariox) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url, {
                idUsuario: idUsuariox,
                nombre: data.nombre,
                dni: data.dni,
                fechaNacimiento: data.fechaNacimiento,
                lugarNacimiento: data.lugarNacimiento,
                sexoEstudiante: data.sexoEstudiante,
                correo: data.correo,
                telefono: data.telefono
            })
            .then(function (response){
                // resolve(response.data);
                // console.log('¡Estudiante creado!');
            })
            .catch(function (error) {
                reject(error);
            })

    })
}

module.exports = crearEstudiante;
