const axios = require('axios').default;

const url = '/v1/sextob/api/habitacion';

// Registrar la habitación en la base de datos
const crearhabitacion = (data, idContratistax) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url, {
                idContratista: idContratistax,
                descripcion: data.descripcion,
                direccion: data.direccion,
                precio: data.precio,
                nCamas: data.nCamas
            })
            .then((response) => {
                // resolve(response.data);
                console.log(`¡Habitación creada!`);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

module.exports = crearhabitacion;
