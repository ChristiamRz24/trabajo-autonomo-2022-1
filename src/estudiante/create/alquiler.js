const axios = require('axios').default;

const url = '/v1/sextob/api/alquiler';

// comentario
const crearAlquiler = (idContratistax, idEstudiantex, data, totalx) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url, {
                idContratista: idContratistax,
                idEstudiante: idEstudiantex,
                fechaEntrada: data.fechaEntrada,
                fechaSalida: data.fechaSalida,
                total: totalx
            })
            .then((response) => {
                // resolve(response.data);
                console.log('¡Habitación alquilada!');
            })
            .catch((error) => console.log(error))
    })
}

module.exports = crearAlquiler;
