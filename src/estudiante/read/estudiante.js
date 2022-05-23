const { Estudiante } = require('../../../models/index');

// Consultar los datos de un estudiante por su id de usuario
const obtenerEstudiante = (idUsuariox) => {
    return new Promise((resolve, reject) => {
        Estudiante
            .find({idUsuario:idUsuariox})
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

module.exports = obtenerEstudiante;
