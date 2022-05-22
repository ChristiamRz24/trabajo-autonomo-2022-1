const axios = require('axios').default;

const url = '/v1/sextob/api/contratista';

const crearContratista = (data, idUsuariox) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url, {
                idUsuario: idUsuariox,
                nombre: data.nombre,
                dni: data.dni,
                direccion: data.direccion,
                telefono: data.telefono
            })
            .then((data) => {
                // resolve(response.data);
                // console.log('¡Contratista creado!');
            })
            .catch((error) => {
                reject(error);
            })
    })
}

module.exports = crearContratista;
