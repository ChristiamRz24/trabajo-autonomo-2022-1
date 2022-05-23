const axios = require('axios').default;

const url = '/v1/sextob/api/habitacion';

// Consultar los datos de un estudiante por su id de usuario
const obtenerHabitacion = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${url}/${id}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

module.exports = obtenerHabitacion;
