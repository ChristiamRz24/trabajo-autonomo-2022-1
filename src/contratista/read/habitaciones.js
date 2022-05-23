const axios = require('axios').default;

const url = '/v1/sextob/api/habitacion';

// Consultar habitaciones
const consultarHabitaciones = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((response) => {
                resolve(response.data.habitaciones);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

module.exports = consultarHabitaciones;
